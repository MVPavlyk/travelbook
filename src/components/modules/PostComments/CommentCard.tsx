'use client';

import Avatar from '@/components/units/Avatar';
import DeleteCommentButton from '@/components/units/DeleteCommentButton';
import formatDateTime from '@/lib/utils/formatDateTime';
import CommentImages from './CommentImages';
import type { NormalizedComment } from '@/lib/utils/comments';

type Props = {
  comment: NormalizedComment;
  isAdmin: boolean;
};

export default function CommentCard({ comment, isAdmin }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        {!!comment.user && <Avatar user={comment.user} />}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-800">
            {comment.user?.firstName ?? ''} {comment.user?.lastName ?? ''}
          </p>
          {comment.isTemp ? (
            <span className="text-xs text-blue-500">sending…</span>
          ) : (
            <span className="text-xs text-gray-500">
              {formatDateTime(new Date(comment.createdAtISO))}
            </span>
          )}
        </div>

        {!comment.isTemp && isAdmin && (
          <div className="ml-auto">
            <DeleteCommentButton commentId={Number(comment.id)} />
          </div>
        )}
      </div>

      <p className="text-gray-700 whitespace-pre-line">{comment.text}</p>
      <CommentImages images={comment.images} />
    </div>
  );
}
