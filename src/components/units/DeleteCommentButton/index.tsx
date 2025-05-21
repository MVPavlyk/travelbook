'use client';

import { useState, useTransition } from 'react';
import { deleteCommentAction } from '@/actions/comments/deleteCommentAction';
import { useRouter } from 'next/navigation';
import AlertModal from '@/components/units/AlertModal';
import Button from '@/components/elements/Button';

type Props = {
  commentId: number;
};

const DeleteCommentButton = ({ commentId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCommentAction(commentId);
      router.refresh();
    });
  };

  return (
    <>
      <div className="flex grow justify-end ">
        <Button onClick={() => setIsOpen(true)} className="bg-red-500">
          Delete
        </Button>
      </div>

      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete this comment?"
        description="This action cannot be undone. The comment will be permanently removed."
        confirmText="Delete Comment"
      />
    </>
  );
};

export default DeleteCommentButton;
