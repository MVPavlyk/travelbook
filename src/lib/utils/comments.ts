import type { User as PrismaUser } from '@prisma/client';
import type {
  CommentWithRelations,
  OptimisticComment,
} from '@/lib/types/comments';

export type NormalizedComment = {
  id: string;
  isTemp: boolean;
  text: string;
  createdAtISO: string;
  user:
    | (Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> & {
        role?: string | null;
      })
    | null;
  images: Array<{ id: string; url: string }>;
};

export function isOptimistic(
  comment: CommentWithRelations | OptimisticComment
): comment is OptimisticComment {
  return (
    (comment as OptimisticComment).__optimistic ||
    typeof comment.id === 'string'
  );
}

export function toNormalized(
  comment: CommentWithRelations | OptimisticComment
): NormalizedComment {
  const id = String(comment.id);
  const isTemp = isOptimistic(comment);

  const createdAtISO =
    typeof comment.createdAt === 'string'
      ? comment.createdAt
      : new Date(comment.createdAt as unknown as string).toISOString();

  const user = comment.user ?? null;
  const images = (comment.images ?? []).map((img) => ({
    id: String(img.id),
    url: img.url,
  }));

  return {
    id,
    isTemp,
    text: comment.text,
    createdAtISO,
    user,
    images,
  };
}
