import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { prismaClient } from '@/lib/prisma';

export async function getSessionAction() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const user = await prismaClient.user.findUnique({
    where: { id: Number(session.user.id) },
  });

  if (!user) return null;

  return { ...session, user: { ...user, role: session.user.role } };
}
