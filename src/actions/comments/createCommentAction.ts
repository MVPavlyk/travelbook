'use server';

import { prismaClient } from '@/lib/prisma';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';

export async function createCommentAction(formData: FormData) {
  const session = await getSessionAction();
  if (!session) throw new Error('Unauthorized');

  const postId = formData.get('postId');
  const text = formData.get('text');

  const files = formData.getAll('images') as File[];

  if (!postId || !text) {
    throw new Error('Missing postId or text');
  }

  const uploadPromises = files.map((file) => uploadImageAction(file));
  const results = await Promise.all(uploadPromises);
  const uploadedUrls: string[] = results.filter((url): url is string => !!url);

  const newComment = await prismaClient.comment.create({
    data: {
      text: text as string,
      postId: Number(postId),
      userId: session.user.id,
      images: {
        create: uploadedUrls.map((url) => ({ url })),
      },
    },
    include: { images: true },
  });

  revalidatePath(`/post/${postId}`);

  return { message: 'Comment created', comment: newComment };
}
