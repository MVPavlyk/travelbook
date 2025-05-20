import React from 'react';
import HomepageTop from '@/components/modules/HomepageTop';
import PostListing from '@/components/modules/PostsListing';
import MainLayout from '@/components/layouts/MainLayout';

type TParams = Promise<{
  page: string;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: TParams;
}) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  return (
    <MainLayout>
      <HomepageTop />
      <PostListing page={currentPage} />
    </MainLayout>
  );
}
