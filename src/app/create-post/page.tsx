import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import CreatePostForm from '@/components/modules/PostForm';
import { getSession } from '@/lib/auth/getAuth';
import { redirect } from 'next/navigation';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';

const CreatePost = async () => {
  const session = await getSession();

  if (!session) {
    redirect(STATIC_ROUTES.LOGIN);
  }

  return (
    <MainLayout>
      <CreatePostForm />
    </MainLayout>
  );
};

export default CreatePost;
