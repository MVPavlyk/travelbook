'use client';

import React, { useState, useTransition } from 'react';
import Modal from '@/components/elements/Modal';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import ImageUploader from '@/components/units/ImageUploader';
import { updateUserAction } from '@/actions/user/updateUserAction';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import Avatar from '@/components/units/Avatar';

type Props = {
  user: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
};

type UpdateUserForm = {
  firstName: string;
  lastName: string;
};

export default function UserUpdateModal({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<UpdateUserForm>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const handleSubmit = (data: UpdateUserForm) => {
    setError(null);
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    if (images[0]) formData.append('avatar', images[0]);

    startTransition(async () => {
      try {
        await updateUserAction(formData);
        router.refresh();
        setIsOpen(false);
      } catch (e: any) {
        setError(e.message || 'Update failed');
      }
    });
  };

  return (
    <>
      <div
        className="flex items-center gap-x-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Avatar user={user} />
        <p className="text-green-50 font-medium">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Profile"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Input
              name="firstName"
              label="First Name"
              type="text"
              placeholder="John"
            />
            <Input
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
            />
            <ImageUploader onImagesChange={(imgs) => setImages(imgs)} max={1} />

            {error && (
              <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
