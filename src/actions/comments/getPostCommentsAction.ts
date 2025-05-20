'use server';

import { prismaClient } from '@/lib/prisma';

export async function getPostCommentsAction(postId: string) {
  try {
    return await prismaClient.comment.findMany({
      where: { postId: Number(postId) },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        images: true,
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}
