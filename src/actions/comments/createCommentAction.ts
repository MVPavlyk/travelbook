'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { prismaClient } from '@/lib/prisma';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { revalidatePath } from 'next/cache';

export async function createCommentAction(formData: FormData) {
  const session = await getServerSession(authOptions);
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
      postId: parseInt(postId as string, 10),
      userId: parseInt(session.user.id, 10),
      images: {
        create: uploadedUrls.map((url) => ({ url })),
      },
    },
    include: { images: true },
  });

  revalidatePath(`/post/${postId}`);

  return { message: 'Comment created', comment: newComment };
}
