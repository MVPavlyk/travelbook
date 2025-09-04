'use server';

import { prismaClient } from '@/lib/prisma';
import { getSessionAction } from '@/actions/user/getSessionAction';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import {
  createCommentSchema,
  MAX_COMMENT_IMAGES,
} from '@/lib/validation/comments';
import { zodToErrors } from '@/lib/validation/utils';
import { FormState } from '@/lib/types/form';
import { validateImages } from '@/lib/validation/files';
import { revalidateTag } from 'next/cache';

const COMMENTS_TAG = (postId: string | number) => `comments:${postId}`;

export async function createCommentAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSessionAction();
  if (!session?.user) return { serverError: 'Unauthorized' };

  const raw = {
    postId: String(formData.get('postId') ?? ''),
    text: String(formData.get('text') ?? ''),
  };
  const clientTempId = String(formData.get('clientTempId') ?? '');

  const parsed = createCommentSchema.safeParse(raw);
  if (!parsed.success)
    return {
      errors: zodToErrors(parsed.error),
      values: raw,
      data: { clientTempId },
    };

  const files = (formData.getAll('images') as File[]).filter(Boolean);
  if (files.length > MAX_COMMENT_IMAGES) {
    return {
      errors: { images: `You can upload up to ${MAX_COMMENT_IMAGES} images.` },
      values: raw,
      data: { clientTempId },
    };
  }
  const imgError = validateImages(files);
  if (imgError)
    return {
      errors: { images: imgError },
      values: raw,
      data: { clientTempId },
    };

  try {
    const uploadedUrls = (
      await Promise.all(files.map((f) => uploadImageAction(f)))
    ).filter((u): u is string => !!u);

    const created = await prismaClient.comment.create({
      data: {
        text: parsed.data.text,
        postId: Number(parsed.data.postId),
        userId: session.user.id,
        images: { create: uploadedUrls.map((url) => ({ url })) },
      },
      include: {
        user: { select: { firstName: true, lastName: true, avatarUrl: true } },
        images: { select: { id: true, url: true } },
      },
    });

    revalidateTag(COMMENTS_TAG(parsed.data.postId));

    return { ok: true, data: { clientTempId, comment: created } };
  } catch {
    return {
      serverError: 'Failed to create comment.',
      values: raw,
      data: { clientTempId },
    };
  }
}
