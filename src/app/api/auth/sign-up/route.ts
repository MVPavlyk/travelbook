import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prismaClient } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exist' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatarUrl: '',
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
