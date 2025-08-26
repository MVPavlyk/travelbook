import ServerActionForm from '@/components/units/ServerActionForm';
import SubmitButton from '@/components/units/ServerActionForm/SubmitButton';
import Textarea from '@/components/elements/Textarea';
import ImageUploader from '../../units/ImageUploader';
import { createCommentAction } from '@/actions/comments/createCommentAction';

export default function CreateCommentForm({
  postId,
}: {
  postId: string | number;
}) {
  return (
    <div className="w-full max-w-[768px] flex flex-col items-center py-8">
      <h3 className="text-2xl text-gray-700 font-semibold mb-4">
        Leave a Comment
      </h3>

      <ServerActionForm
        action={createCommentAction}
        className="space-y-4 w-full max-w-[768px]"
      >
        <input type="hidden" name="postId" value={postId} />

        <Textarea
          name="text"
          label="Comment"
          placeholder="Write your comment..."
          rows={4}
          required
        />
        <ImageUploader name="images" multiple max={10} />

        <SubmitButton>Comment</SubmitButton>
      </ServerActionForm>
    </div>
  );
}
