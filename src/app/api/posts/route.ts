import { getServerSession } from 'next-auth';
import { prismaClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth/authOptions';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      country,
      duration,
      impression,
      approximateCost,
      description,
    } = await req.json();

    if (
      !title ||
      !country ||
      !duration ||
      !impression ||
      !approximateCost ||
      !description
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newPost = await prismaClient.post.create({
      data: {
        title,
        country,
        duration,
        impression: parseFloat(impression),
        approximateCost: parseInt(approximateCost, 10),
        description,
        userId: parseInt(session.user.id, 10),
      },
    });

    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
