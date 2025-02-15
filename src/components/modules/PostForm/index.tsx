'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { useRouter } from 'next/navigation';
import Textarea from '@/components/elements/Textarea';

type CreatePost = {
  title: string;
  country: string;
  duration: string;
  impression: string;
  approximateCost: string;
  description: string;
};

//TODO: images upload, map points, country selector, duration selector?

const CreatePostForm = () => {
  const methods = useForm<CreatePost>({
    defaultValues: {
      title: '',
      country: '',
      duration: '',
      impression: '',
      approximateCost: '',
      description: '',
    },
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: CreatePost) => {
    setLoading(true);
    setErrorMessage(null);

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(resData.error || 'Something went wrong');
      return;
    }

    router.push('/posts');
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
          {methods.formState.errors.title && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.title.message}
            </p>
          )}

          <Input
            name="country"
            label="Country"
            type="text"
            className="w-full"
            placeholder="Enter country"
          />
          {methods.formState.errors.country && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.country.message}
            </p>
          )}

          <Input
            name="duration"
            label="Duration"
            type="text"
            className="w-full"
            placeholder="Enter duration (e.g. 5 days)"
          />
          {methods.formState.errors.duration && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.duration.message}
            </p>
          )}

          <Input
            name="impression"
            label="Impression Score"
            type="number"
            className="w-full"
            placeholder="Enter impression score (0-10)"
          />
          {methods.formState.errors.impression && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.impression.message}
            </p>
          )}

          <Input
            name="approximateCost"
            label="Approximate Cost ($)"
            type="number"
            className="w-full"
            placeholder="Enter cost in USD"
          />
          {methods.formState.errors.approximateCost && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.approximateCost.message}
            </p>
          )}

          <Textarea
            name="description"
            label="Description"
            className="w-full"
            placeholder="Enter description"
          />
          {methods.formState.errors.description && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.description.message}
            </p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button
            className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePostForm;
