'use client';

import { useState, useTransition } from 'react';
import { deletePostAction } from '@/actions/posts/deletePostAction';
import { useRouter } from 'next/navigation';
import AlertModal from '@/components/units/AlertModal';
import Button from '@/components/elements/Button';

const DeletePostButton = ({ postId }: { postId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePostAction(postId);
      router.push('/');
    });
  };

  return (
    <>
      <div className="w-full flex justify-start px-60 pt-6">
        <Button onClick={() => setIsOpen(true)} className="bg-red-500">
          Delete Post
        </Button>
      </div>

      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete this post?"
        description="This action cannot be undone. The post and all related data will be permanently removed."
        confirmText="Delete Post"
      />
    </>
  );
};

export default DeletePostButton;
