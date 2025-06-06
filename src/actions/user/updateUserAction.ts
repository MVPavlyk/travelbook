'use server';

import { prismaClient } from '@/lib/prisma';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';

export async function updateUserAction(formData: FormData) {
  const session = await getSessionAction();
  if (!session?.user) throw new Error('Unauthorized');

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const avatarFile = formData.get('avatar') as File | null;

  if (!firstName || !lastName) {
    throw new Error('Missing required fields');
  }

  let avatarUrl: string | null = null;

  if (avatarFile) {
    const url = await uploadImageAction(avatarFile);
    if (url) avatarUrl = url;
  }

  const updatedUser = await prismaClient.user.update({
    where: { id: session?.user?.id },
    data: {
      firstName,
      lastName,
      ...(avatarUrl ? { avatarUrl } : {}),
    },
  });

  revalidatePath('/');

  return {
    message: 'User updated',
    user: {
      id: updatedUser.id.toString(),
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      avatarUrl: updatedUser.avatarUrl,
    },
  };
}
