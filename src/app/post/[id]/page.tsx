import React from 'react';

import { prismaClient } from '@/lib/prisma';
import NotFound from 'next/dist/client/components/not-found-error';
import LocationIcon from '@/assets/icons/LocationIcon';
import PostDurationIcon from '@/assets/icons/PostDurationIcon';
import PostCostIcon from '@/assets/icons/PostCostIcon';
import PostImpressionIcon from '@/assets/icons/PostImpressionIcon';
import MainLayout from '@/components/layouts/MainLayout';
import ImageCarousel from '@/components/units/ImageCarousel';
import CreateCommentForm from '@/components/modules/CommentsForm';
import PostCommentsSection from '@/components/modules/PostComments';
import DeletePostButton from '@/components/units/DeletePostButton';
import { getSessionAction } from '@/actions/user/getSessionAction';

type TParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: TParams }) => {
  const session = await getSessionAction();

  const { id: postId } = await params;

  const post = await prismaClient.post.findUnique({
    where: {
      id: Number(postId),
    },
    include: {
      images: true,
    },
  });

  if (!post) return NotFound();

  const {
    title,
    description,
    country,
    approximateCost,
    impression,
    duration,
    images,
  } = post;

  const TOPBLOCK_POINTS = [
    {
      Icon: PostDurationIcon,
      label: 'Duration',
      value: duration,
    },
    {
      Icon: PostCostIcon,
      label: 'Cost',
      value: approximateCost,
    },
    {
      Icon: PostImpressionIcon,
      label: 'Impression',
      value: impression,
    },
  ];

  //TODO: images carousel, map, comments?

  return (
    <MainLayout>
      <div className="w-full h-[200px] bg-gray-100 px-60 flex items-center justify-between">
        <div className="w-1/3">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="flex items-center gap-x-3 mt-4">
            <LocationIcon color="#6E6E6E" />
            <p className="text-gray-600">{country}</p>
          </div>
        </div>

        <div className="w-2/3 grid grid-cols-3">
          {TOPBLOCK_POINTS.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-x-7">
              <Icon />
              <div>
                <p className="text-gray-600">{label}</p>
                <p className="font-bold text-xl -mt-2">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageCarousel images={images} />
      {session?.user.role === 'admin' && (
        <DeletePostButton postId={Number(postId)} />
      )}
      <div className="w-full px-60 py-16">
        <h3 className="text-2xl font-bold">How it was</h3>
        <p className="w-full whitespace-pre-line text-gray-600">
          {description}
        </p>
      </div>
      <div className="w-full flex flex-col pb-16 gap-y-10 items-center j">
        <CreateCommentForm postId={postId} />
        <PostCommentsSection postId={postId} />
      </div>
    </MainLayout>
  );
};

export default Page;
