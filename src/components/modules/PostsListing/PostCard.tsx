import React from 'react';

import { Prisma } from '@prisma/client';
import Image from 'next/image';
import DurationIcon from '@/assets/icons/DurationIcon';
import ImpressionIcon from '@/assets/icons/ImpressionIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import Button from '@/components/elements/Button';

type TPostCardProps = {
  post: Prisma.PostGetPayload<{
    include: { images: true; author: true };
  }>;
};

const PostCard: React.FC<TPostCardProps> = ({ post }) => {
  const {
    images,
    title,
    duration,
    impression,
    country,
    description,
    approximateCost,
  } = post;

  return (
    <div className="h-[630px] rounded-lg overflow-hidden shadow-xl w-full flex flex-col">
      <Image
        src={
          images[0].url ||
          'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg'
        }
        alt={title}
        height={230}
        width={410}
        className="w-full h-[230px] object-cover relative shadow-lg"
      />
      <div className="w-full grow p-7 pb-8 flex flex-col justify-between">
        <div>
          <div className="w-full h-10 bg-white flex items-center justify-between px-5 shadow-lg rounded-[5px]">
            <div className="flex items-center gap-x-3 text-gray-600">
              <DurationIcon /> {duration}
            </div>
            <div className="flex items-center gap-x-3 text-gray-600">
              <ImpressionIcon /> {impression}
            </div>
          </div>
          <h4 className="text-black text-lg font-bold mt-[30px]">{title}</h4>
          <div className="flex items-center gap-x-3 text-gray-600 mt-1">
            <LocationIcon /> {country}
          </div>
          <hr className="w-full h-[1px] bg-gray-300 my-5" />
          <p className="line-clamp-3 text-gray-600">{description}</p>
          <hr className="w-full h-[1px] bg-gray-300 mt-5" />
        </div>
        <div className="flex w-full items-center justify-between">
          <Button>Details</Button>
          <div className="text-right">
            <p className="text-gray-600">Total</p>
            <h5 className="font-bold text-2xl">{approximateCost}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
