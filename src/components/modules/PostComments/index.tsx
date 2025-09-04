import { getPostCommentsAction } from '@/actions/comments/getPostCommentsAction';
import { getSessionAction } from '@/actions/user/getSessionAction';
import OptimisticComments from './OptimisticComments';
import { CommentWithRelations } from '@/lib/types/comments';

export default async function PostCommentsSection({
  postId,
}: {
  postId: string;
}) {
  const comments = (await getPostCommentsAction(
    postId
  )) as CommentWithRelations[];
  const session = await getSessionAction();

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">
        Comments ({comments.length})
      </h3>
      <OptimisticComments
        initial={comments}
        postId={postId}
        session={session}
      />
    </div>
  );
}
