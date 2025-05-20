'use client';

import React, { FC, useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { useRouter } from 'next/navigation';
import Textarea from '@/components/elements/Textarea';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import { createPostAction } from '@/actions/posts/createPostAction';
import ImageUploader from '@/components/units/ImageUploader';
import { TCountry } from '@/lib/types/county';
import SelectInput from '@/components/elements/Select';

//TODO: images upload, map points, country selector, duration selector?

export type CreatePost = {
  title: string;
  country: string;
  duration: string;
  impression: number;
  approximateCost: number;
  description: string;
};

type TCreatePostForm = {
  countries: TCountry[] | null;
};

const CreatePostForm: FC<TCreatePostForm> = ({ countries }) => {
  const methods = useForm<CreatePost>({
    defaultValues: {
      title: '',
      country: '',
      duration: '',
      impression: 0,
      approximateCost: 0,
      description: '',
    },
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onSubmit = (data: CreatePost) => {
    setErrorMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    selectedImages.forEach((file) => {
      formData.append('images', file); // ключ 'images' буде масивом файлів
    });

    startTransition(async () => {
      try {
        await createPostAction(formData);
        router.push(STATIC_ROUTES.HOME);
      } catch (error: any) {
        setErrorMessage(error.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="text-center flex flex-col items-center py-10">
      <h3 className="text-4xl text-gray-700 font-semibold mb-6">
        Create New Post
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg"
        >
          <Input
            name="title"
            label="Title"
            type="text"
            className="w-full"
            placeholder="Enter post title"
          />
          <SelectInput
            options={
              countries
                ? countries?.map((el) => ({
                    label: el.name,
                    value: el.name,
                  }))
                : []
            }
            name="country"
            label="Country"
            className="w-full"
            placeholder="Enter country"
          />
          <Input
            name="duration"
            label="Duration"
            type="text"
            className="w-full"
            placeholder="Enter duration (e.g. 5 days)"
          />
          <Input
            name="impression"
            label="Impression Score"
            type="range"
            className="w-full"
            min={0}
            max={10}
            step={1}
            placeholder="Enter impression score (0-10)"
          />
          <Input
            name="approximateCost"
            label="Approximate Cost ($)"
            type="range"
            min={0}
            max={50000}
            step={100}
            className="w-full"
            placeholder="Enter cost in USD"
          />
          <Textarea
            name="description"
            label="Description"
            className="w-full"
            placeholder="Enter description"
          />
          <ImageUploader onImagesChange={setSelectedImages} />

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button
            className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isPending}
          >
            {isPending ? 'Creating Post...' : 'Create Post'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePostForm;
