'use server';

import { prismaClient } from '@/lib/prisma';

export async function getPaginatedPostsAction(
  page: number = 1,
  perPage: number = 3
) {
  const skip = (page - 1) * perPage;

  const [posts, total] = await Promise.all([
    prismaClient.post.findMany({
      skip,
      take: perPage,
      include: {
        images: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prismaClient.post.count(),
  ]);

  return {
    posts,
    total,
  };
}
