'use client';

import { useEffect, useOptimistic, startTransition } from 'react';
import type {
  AddPayload,
  CommentWithRelations,
  OptimisticComment,
  OptimisticPayload,
  ReducerPayload,
  RemovePayload,
  ReplacePayload,
  SessionLike,
} from '@/lib/types/comments';
import { UI_EVENTS } from '@/lib/constants/uiEvents';
import { toNormalized } from '@/lib/utils/comments';
import CommentCard from './CommentCard';

export default function OptimisticComments({
  initial,
  postId,
  session,
}: {
  initial: CommentWithRelations[];
  postId: string | number;
  session: SessionLike;
}) {
  const isAdmin = session?.user?.role === 'admin';

  const [optimisticComments, setOptimisticComments] = useOptimistic<
    Array<CommentWithRelations | OptimisticComment>,
    ReducerPayload
  >(initial, (currentState, payload) => {
    switch (payload.mode) {
      case 'replace': {
        const { clientTempId, serverComment } = payload;
        return currentState.map((comment) =>
          String(comment.id) === String(clientTempId) ? serverComment : comment
        );
      }
      case 'remove': {
        const { clientTempId } = payload;
        return currentState.filter(
          (comment) => String(comment.id) !== String(clientTempId)
        );
      }
      case 'add': {
        const optimisticComment: OptimisticComment = {
          id: payload.tempId,
          text: payload.text,
          createdAt: payload.createdAt,
          user: session?.user ?? null,
          images: (payload.previews || []).map((url) => ({ id: url, url })),
          __optimistic: true,
        };
        return [optimisticComment, ...currentState];
      }
    }
  });

  useEffect(() => {
    const handleCreating = (event: Event) => {
      const customEvent = event as CustomEvent<OptimisticPayload>;
      if (String(customEvent.detail?.postId) !== String(postId)) return;

      const addPayload: AddPayload = { mode: 'add', ...customEvent.detail };
      startTransition(() => setOptimisticComments(addPayload));
    };

    const handleCreated = (event: Event) => {
      const customEvent = event as CustomEvent<{
        clientTempId?: string;
        comment?: CommentWithRelations;
      }>;
      const clientTempId = customEvent.detail?.clientTempId;
      const serverComment = customEvent.detail?.comment;
      if (!clientTempId || !serverComment) return;

      const replacePayload: ReplacePayload = {
        mode: 'replace',
        clientTempId,
        serverComment,
      };
      startTransition(() => setOptimisticComments(replacePayload));
    };

    const handleFailed = (event: Event) => {
      const customEvent = event as CustomEvent<{ clientTempId?: string }>;
      const clientTempId = customEvent.detail?.clientTempId;
      if (!clientTempId) return;

      const removePayload: RemovePayload = { mode: 'remove', clientTempId };
      startTransition(() => setOptimisticComments(removePayload));
    };

    window.addEventListener(
      UI_EVENTS.comment.creating,
      handleCreating as EventListener
    );
    window.addEventListener(
      UI_EVENTS.comment.created,
      handleCreated as EventListener
    );
    window.addEventListener(
      UI_EVENTS.comment.failed,
      handleFailed as EventListener
    );
    return () => {
      window.removeEventListener(
        UI_EVENTS.comment.creating,
        handleCreating as EventListener
      );
      window.removeEventListener(
        UI_EVENTS.comment.created,
        handleCreated as EventListener
      );
      window.removeEventListener(
        UI_EVENTS.comment.failed,
        handleFailed as EventListener
      );
    };
  }, [setOptimisticComments, postId]);

  return (
    <div className="space-y-6 w-full">
      {optimisticComments.map((commentRaw) => {
        const normalizedComment = toNormalized(commentRaw);
        return (
          <CommentCard
            key={normalizedComment.id}
            comment={normalizedComment}
            isAdmin={isAdmin}
          />
        );
      })}
    </div>
  );
}
