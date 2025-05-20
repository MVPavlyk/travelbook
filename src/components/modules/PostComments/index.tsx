import { getPostCommentsAction } from '@/actions/comments/getPostCommentsAction';
import Image from 'next/image';
import Avatar from '@/components/units/Avatar';

type Props = {
  postId: string;
};

export default async function PostCommentsSection({ postId }: Props) {
  const comments = await getPostCommentsAction(postId);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-10">
      <div className="space-y-6 w-full">
        <h3 className="text-2xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <Avatar user={comment.user} />
                <div>
                  <p className="font-semibold text-gray-800">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    at{' '}
                    {new Date(comment.createdAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-line">
                {comment.text}
              </p>

              {comment.images.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {comment.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-[120px] h-[80px] rounded-md overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt="comment image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
