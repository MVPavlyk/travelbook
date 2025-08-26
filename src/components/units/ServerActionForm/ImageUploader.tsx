'use client';

import React, { useEffect, useRef, useState } from 'react';

type ImageWithPreview = { file: File; preview: string };

type Props = {
  name: string;
  max?: number;
  accept?: string;
  multiple?: boolean;
};

export default function ImageUploader({
  name,
  max = 10,
  accept = 'image/*',
  multiple = true,
}: Props) {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const syncToInput = (files: File[]) => {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    files.slice(0, max).forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    const next = [
      ...images,
      ...picked.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ].slice(0, max);
    setImages(next);
    syncToInput(next.map((i) => i.file));
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    setImages(next);
    syncToInput(next.map((i) => i.file));
  };

  useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.preview));
  }, [images]);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple && max > 1}
        className="hidden"
        onChange={handleFilesChange}
      />

      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => inputRef.current?.click()}
        >
          {images.length ? 'Add more' : 'Add Image'}
        </button>
        <span className="text-sm text-gray-600">
          {images.length}/{max}
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.preview}
              className="w-32 h-32 object-cover rounded"
              alt={`preview-${index}`}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
