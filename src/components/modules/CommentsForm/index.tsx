'use client';

import React, { FC, useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/elements/Button';
import Textarea from '@/components/elements/Textarea';
import ImageUploader from '@/components/units/ImageUploader';
import { createCommentAction } from '@/actions/comments/createCommentAction';

type TCreateCommentForm = {
  postId: string;
};

export type CreateComment = {
  text: string;
};

const CreateCommentForm: FC<TCreateCommentForm> = ({ postId }) => {
  const methods = useForm<CreateComment>({
    defaultValues: {
      text: '',
    },
  });

  const [resetImagesCount, setResetImagesCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateComment) => {
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('text', data.text);

    selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    startTransition(async () => {
      try {
        await createCommentAction(formData);
        methods.reset();
        setSelectedImages([]);
        setResetImagesCount((prev) => prev + 1);
      } catch (error: any) {
        setErrorMessage(error.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="w-full max-w-[768px] flex flex-col items-center py-8">
      <h3 className="text-2xl text-gray-700 font-semibold mb-4">
        Leave a Comment
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[768px] "
        >
          <Textarea
            name="text"
            label="Comment"
            className="w-full"
            placeholder="Write your comment..."
          />

          <ImageUploader
            onImagesChange={setSelectedImages}
            resetTrigger={resetImagesCount}
          />

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button
            className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateCommentForm;
