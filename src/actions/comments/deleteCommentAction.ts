'use server';

import { prismaClient } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';

export async function deleteCommentAction(commentId: number) {
  const session = await getSessionAction();

  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId },
    select: { postId: true },
  });

  if (!comment) throw new Error('Comment not found');

  await prismaClient.comment.delete({
    where: { id: commentId },
  });

  revalidatePath(`/posts/${comment.postId}`);
}
