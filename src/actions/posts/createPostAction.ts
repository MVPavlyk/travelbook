'use server';

import { prismaClient } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { getSessionAction } from '@/actions/user/getSessionAction';

export async function createPostAction(formData: FormData) {
  const session = await getSessionAction();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const country = formData.get('country') as string;
  const duration = formData.get('duration') as string;
  const impression = formData.get('impression') as string;
  const approximateCost = formData.get('approximateCost') as string;
  const description = formData.get('description') as string;

  const files = formData.getAll('images') as File[];

  if (
    !title ||
    !country ||
    !duration ||
    !impression ||
    !approximateCost ||
    !description
  ) {
    throw new Error('All fields are required');
  }

  const uploadPromises = files.map(async (file) => {
    return await uploadImageAction(file);
  });

  const results = await Promise.all(uploadPromises);

  const uploadedUrls: string[] = results.filter((url): url is string => !!url);

  const newPost = await prismaClient.post.create({
    data: {
      title,
      country,
      duration,
      impression: Number(impression),
      approximateCost: Number(approximateCost),
      description,
      userId: session.user.id,
      images: {
        create: uploadedUrls.map((url) => ({ url })),
      },
    },
    include: { images: true },
  });

  revalidatePath('/');
  return { message: 'Post created', post: newPost };
}
