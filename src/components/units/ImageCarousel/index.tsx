'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

type ImageType = {
  id: number;
  url: string;
};

export default function ImageCarousel({ images }: { images: ImageType[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  if (!images || images.length === 0) return null;

  const total = images.length;

  const next = () =>
    setStartIndex((prev) =>
      prev + visibleCount >= total ? 0 : prev + visibleCount
    );
  const prev = () =>
    setStartIndex((prev) =>
      prev - visibleCount < 0
        ? Math.max(0, total - visibleCount)
        : prev - visibleCount
    );

  const visibleImages = images.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative w-full py-10">
      <div className="flex gap-4 justify-center">
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="relative w-[300px] h-[200px] flex-shrink-0 overflow-hidden rounded-xl shadow"
          >
            <Image
              src={image.url}
              alt={`image-${image.id}`}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
      </div>

      {total > visibleCount && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
}
