import React, { FC } from 'react';
import PostCard from '@/components/modules/PostsListing/PostCard';
import Pagination from '@/components/modules/Pagination';
import { getPaginatedPostsAction } from '@/actions/posts/getPaginatedPostsAction';

type Props = {
  page: number;
};

const PostListing: FC<Props> = async ({ page }) => {
  const { posts, total } = await getPaginatedPostsAction(page, 12);

  return (
    <div className="w-full px-60 py-32">
      <section className="w-full grid grid-cols-3 gap-10">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </section>
      <Pagination total={total} />
    </div>
  );
};

export default PostListing;
