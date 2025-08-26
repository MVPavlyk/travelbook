'use server';

import { prismaClient } from '@/lib/prisma';
import { uploadImageAction } from '@/actions/images/uploadImageAction';
import { revalidatePath } from 'next/cache';
import { getSessionAction } from '@/actions/user/getSessionAction';

import { updateUserSchema } from '@/lib/validation/users';
import { validateSingleImage } from '@/lib/validation/files';
import { zodToErrors } from '@/lib/validation/utils';
import { FormState } from '@/lib/types/form';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';

export async function updateUserAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSessionAction();
  if (!session?.user) return { serverError: 'Unauthorized' };

  const raw = {
    firstName: String(formData.get('firstName') ?? ''),
    lastName: String(formData.get('lastName') ?? ''),
  };

  const parsed = updateUserSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: zodToErrors(parsed.error), values: raw };
  }

  const avatarFile = formData.get('avatar') as File | null;
  const fileError = validateSingleImage(avatarFile);
  if (fileError) {
    return { errors: { avatar: fileError }, values: raw };
  }

  let avatarUrl: string | null = null;
  if (avatarFile && avatarFile.size) {
    const url = await uploadImageAction(avatarFile);
    if (url) avatarUrl = url;
  }

  await prismaClient.user.update({
    where: { id: session.user.id },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      ...(avatarUrl ? { avatarUrl } : {}),
    },
  });

  revalidatePath(STATIC_ROUTES.HOME);

  return { ok: true };
}
