'use client';

import { useEffect, useOptimistic, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatar from '@/components/units/Avatar';
import DeleteCommentButton from '@/components/units/DeleteCommentButton';
import type {
  Comment as PrismaComment,
  User as PrismaUser,
  Image as PrismaImage,
} from '@prisma/client';

export type CommentWithRelations = PrismaComment & {
  user: Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'>;
  images: Array<Pick<PrismaImage, 'id' | 'url'>>;
};

type OptimisticPayload = {
  tempId: string;
  postId: string | number;
  text: string;
  previews: string[];
  createdAt: string;
};

type OptimisticComment = {
  id: string;
  text: string;
  createdAt: string;
  user: Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> | null;
  images: Array<{ id: string; url: string }>;
  __optimistic?: true;
};

type UIComment = CommentWithRelations | OptimisticComment;

type SessionLike = {
  user?:
    | (Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> & {
        role?: string | null;
      })
    | null;
} | null;

function formatDateTime(d: Date) {
  const date = d.toLocaleDateString('en-EN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const time = d.toLocaleTimeString('en-EN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${date} at ${time}`;
}

export default function OptimisticComments({
  initial,
  postId,
  session,
}: {
  initial: CommentWithRelations[];
  postId: string | number;
  session: SessionLike;
}) {
  const router = useRouter();
  const isAdmin = session?.user?.role === 'admin';

  const [optimistic, addOptimistic] = useOptimistic<
    UIComment[],
    OptimisticPayload
  >(initial, (state, payload) => {
    const optimisticItem: OptimisticComment = {
      id: payload.tempId,
      text: payload.text,
      createdAt: payload.createdAt,
      user: session?.user ?? null,
      images: (payload.previews || []).map((url) => ({ id: url, url })),
      __optimistic: true,
    };
    return [optimisticItem, ...state];
  });

  useEffect(() => {
    const onCreating = (e: Event) => {
      const ce = e as CustomEvent<OptimisticPayload>;
      if (String(ce.detail?.postId) !== String(postId)) return;
      startTransition(() => addOptimistic(ce.detail));
    };
    const onCreated = () => router.refresh();

    window.addEventListener('comment:creating', onCreating as EventListener);
    window.addEventListener('comment:created', onCreated as EventListener);
    return () => {
      window.removeEventListener(
        'comment:creating',
        onCreating as EventListener
      );
      window.removeEventListener('comment:created', onCreated as EventListener);
    };
  }, [addOptimistic, postId, router]);

  return (
    <div className="space-y-6 w-full">
      {optimistic.map((comment) => {
        const isTemp =
          typeof comment.id === 'string' && comment.id.startsWith('temp-');
        const user = (comment as any).user as
          | (Pick<PrismaUser, 'firstName' | 'lastName' | 'avatarUrl'> & {
              role?: string | null;
            })
          | null;

        return (
          <div
            key={String(comment.id)}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar user={user as any} />
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">
                  {user?.firstName ?? ''} {user?.lastName ?? ''}
                </p>
                {isTemp ? (
                  <span className="text-xs text-blue-500">sending…</span>
                ) : (
                  <span className="text-xs text-gray-500">
                    {formatDateTime(new Date((comment as any).createdAt))}
                  </span>
                )}
              </div>
              {!isTemp && isAdmin && (
                <div className="ml-auto">
                  <DeleteCommentButton commentId={comment.id as number} />
                </div>
              )}
            </div>

            <p className="text-gray-700 whitespace-pre-line">{comment.text}</p>

            {(comment as any).images?.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {(comment as any).images.map(
                  (img: { id: string | number; url: string }) => (
                    <div
                      key={String(img.id)}
                      className="relative w-[120px] h-[80px] rounded-md overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
