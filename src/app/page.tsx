import React from 'react';
import HomepageTop from '@/components/modules/HomepageTop';
import PostListing from '@/components/modules/PostsListing';

export default function Home() {
  return (
    <section>
      <HomepageTop />
      <PostListing />
    </section>
  );
}
