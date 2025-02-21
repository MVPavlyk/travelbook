import React from 'react';
import { prismaClient } from '@/lib/prisma';
import PostCard from '@/components/modules/PostsListing/PostCard';
import Pagination from '@/components/modules/Pagination';

const PostListing = async () => {
  const posts = await prismaClient.post.findMany({
    include: {
      images: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalPosts = await prismaClient.post.count();

  return (
    <div className="w-full px-60 py-32">
      <section className="w-full grid grid-cols-3 gap-10">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </section>
      <Pagination total={totalPosts} />
    </div>
  );
};

export default PostListing;
