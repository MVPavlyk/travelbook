'use server';

import { prismaClient } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { getSessionAction } from '@/actions/user/getSessionAction';
import { redirect } from 'next/navigation';

import { createPostSchema } from '@/lib/validation/posts';
import { zodToErrors } from '@/lib/validation/utils';
import { validateImages } from '@/lib/validation/files';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import { FormState } from '@/lib/types/form';

export async function createPostAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSessionAction();
  if (!session) return { serverError: 'Unauthorized', values: {} };

  const rawValues = {
    title: String(formData.get('title') ?? ''),
    country: String(formData.get('country') ?? ''),
    duration: String(formData.get('duration') ?? ''),
    impression: String(formData.get('impression') ?? ''),
    approximateCost: String(formData.get('approximateCost') ?? ''),
    description: String(formData.get('description') ?? ''),
  };

  const parsed = createPostSchema.safeParse(rawValues);
  if (!parsed.success) {
    return { errors: zodToErrors(parsed.error), values: rawValues };
  }

  const files = formData.getAll('images') as File[];
  const imageError = validateImages(files);
  if (imageError) {
    return { errors: { images: imageError }, values: rawValues };
  }

  const uploadedUrls = (
    await Promise.all(files.map((file) => uploadImageAction(file)))
  ).filter((url): url is string => !!url);

  const parsedData = parsed.data;

  await prismaClient.post.create({
    data: {
      title: parsedData.title,
      country: parsedData.country,
      duration: parsedData.duration,
      impression: parsedData.impression,
      approximateCost: parsedData.approximateCost,
      description: parsedData.description,
      userId: session.user.id,
      images: { create: uploadedUrls.map((url) => ({ url })) },
    },
    include: { images: true },
  });

  revalidatePath(STATIC_ROUTES.HOME);
  redirect(STATIC_ROUTES.HOME);
}
