'use server';

import { prismaClient } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';
import { uploadImageAction } from '@/actions/images/uploadImageAction';

import {
  createCommentSchema,
  MAX_COMMENT_IMAGES,
} from '@/lib/validation/comments';
import { zodToErrors } from '@/lib/validation/utils';
import { FormState } from '@/lib/types/form';
import { validateImages } from '@/lib/validation/files';

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

  const parsed = createCommentSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: zodToErrors(parsed.error), values: raw };
  }

  const files = formData.getAll('images') as File[];
  if (files.length > MAX_COMMENT_IMAGES) {
    return {
      errors: { images: `You can upload up to ${MAX_COMMENT_IMAGES} images.` },
      values: raw,
    };
  }
  const imgError = validateImages(files);
  if (imgError) {
    return { errors: { images: imgError }, values: raw };
  }

  const uploadedUrls = (
    await Promise.all(files.map((f) => uploadImageAction(f)))
  ).filter((u): u is string => !!u);

  await prismaClient.comment.create({
    data: {
      text: parsed.data.text,
      postId: parsed.data.postId,
      userId: session.user.id,
      images: { create: uploadedUrls.map((url) => ({ url })) },
    },
  });

  revalidatePath(`/post/${parsed.data.postId}`);

  return { ok: true };
}
