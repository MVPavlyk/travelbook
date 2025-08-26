'use server';

import bcrypt from 'bcryptjs';
import { prismaClient } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { signUpSchema } from '@/lib/validation/users';
import { zodToErrors } from '@/lib/validation/utils';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import { FormState } from '@/lib/types/form';

export async function signUpAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    firstName: String(formData.get('firstName') ?? ''),
    lastName: String(formData.get('lastName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: zodToErrors(parsed.error), values: raw };
  }

  const parsedData = parsed.data;
  const email = parsedData.email.toLowerCase();

  const exists = await prismaClient.user.findUnique({ where: { email } });
  if (exists) {
    return {
      errors: { email: 'Email already exists.' },
      values: { ...raw, email },
    };
  }

  const hashed = await bcrypt.hash(parsedData.password, 10);
  await prismaClient.user.create({
    data: {
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      email,
      password: hashed,
      avatarUrl: '',
    },
  });

  redirect(STATIC_ROUTES.LOGIN);
}
