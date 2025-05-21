'use server';

import { prismaClient } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { revalidatePath } from 'next/cache';

export async function deletePostAction(postId: number) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  await prismaClient.post.delete({
    where: { id: postId },
  });

  revalidatePath('/');
}
