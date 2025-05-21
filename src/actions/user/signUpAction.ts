'use server';

import bcrypt from 'bcryptjs';
import { prismaClient } from '@/lib/prisma';

type RegisterUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signUpAction(data: RegisterUserInput) {
  const { firstName, lastName, email, password } = data;

  const existingUser = await prismaClient.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prismaClient.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatarUrl: '',
    },
  });
}
