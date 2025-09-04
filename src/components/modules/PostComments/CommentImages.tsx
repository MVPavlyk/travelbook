'use client';

import Image from 'next/image';

type Props = {
  images: Array<{ id: string; url: string }>;
};

export default function CommentImages({ images }: Props) {
  if (!images?.length) return null;

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative w-[120px] h-[80px] rounded-md overflow-hidden"
        >
          <Image src={img.url} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
