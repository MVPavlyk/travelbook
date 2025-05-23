'use server';

import { prismaClient } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';

export async function deletePostAction(postId: number) {
  const session = await getSessionAction();

  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  await prismaClient.post.delete({
    where: { id: postId },
  });

  revalidatePath('/');
}
