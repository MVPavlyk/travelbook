'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

type ImageType = {
  id: number;
  url: string;
};

export default function ImageCarousel({ images }: { images: ImageType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const draggingRef = useRef(false);

  if (!images || images.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    draggingRef.current = false;

    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      draggingRef.current = true;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      container.style.cursor = 'grab';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    container.style.cursor = 'grabbing';
  };

  const handleImageClick = (url: string) => {
    if (!draggingRef.current) {
      setActiveImage(url);
    }
  };

  return (
    <div className="w-full py-10 relative px-60 flex justify-center">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className="flex gap-4 overflow-x-auto px-2 cursor-grab select-none scrollbar-none"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative w-[300px] h-[200px] flex-shrink-0 overflow-hidden rounded-xl shadow hover:opacity-80 transition"
            onClick={() => handleImageClick(image.url)}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            <Image
              src={image.url}
              alt={`image-${image.id}`}
              fill
              className="object-cover"
              sizes="300px"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative w-[90vw] max-w-4xl h-[80vh]">
            <Image
              src={activeImage}
              alt="Expanded image"
              fill
              className="object-contain rounded-xl"
              sizes="90vw"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
