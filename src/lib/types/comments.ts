import type {
  Comment as PrismaComment,
  User as PrismaUser,
  Image as PrismaImage,
} from '@prisma/client';

export type CommentWithRelations = PrismaComment & {
  user: Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'>;
  images: Array<Pick<PrismaImage, 'id' | 'url'>>;
};

export type OptimisticPayload = {
  tempId: string;
  postId: string | number;
  text: string;
  previews: string[];
  createdAt: string;
};

export type OptimisticComment = {
  id: string;
  text: string;
  createdAt: string;
  user: Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> | null;
  images: Array<{ id: string; url: string }>;
  __optimistic?: true;
};

export type UIComment = CommentWithRelations | OptimisticComment;

export type SessionLike = {
  user?:
    | (Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> & {
        role?: string | null;
      })
    | null;
} | null;

export type AddPayload = OptimisticPayload & { mode: 'add' };
export type ReplacePayload = {
  mode: 'replace';
  clientTempId: string;
  serverComment: CommentWithRelations;
};
export type RemovePayload = { mode: 'remove'; clientTempId: string };
export type ReducerPayload = AddPayload | ReplacePayload | RemovePayload;
