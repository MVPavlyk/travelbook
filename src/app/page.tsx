import React from 'react';
import HomepageTop from '@/components/modules/HomepageTop';
import PostListing from '@/components/modules/PostsListing';
import MainLayout from '@/components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <HomepageTop />
      <PostListing />
    </MainLayout>
  );
}
