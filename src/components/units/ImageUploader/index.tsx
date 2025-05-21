'use client';

import React, { useEffect, useRef, useState } from 'react';

type ImageWithPreview = {
  file: File;
  preview: string;
};

type Props = {
  onImagesChange: (images: File[]) => void;
  resetTrigger?: number;
  max?: number;
};

const ImageUploader = ({ onImagesChange, resetTrigger, max = 1 }: Props) => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, max).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updated = [...images, ...newImages].slice(0, max);
    setImages(updated);
    onImagesChange(updated.map((img) => img.file));
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    onImagesChange(updated.map((img) => img.file));
  };

  useEffect(() => {
    setImages([]);
    onImagesChange([]);
  }, [resetTrigger]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple={max > 1}
        onChange={handleFilesChange}
        ref={fileInputRef}
        hidden
      />
      {images.length < max && (
        <button
          type="button"
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => fileInputRef.current?.click()}
        >
          Add Image
        </button>
      )}
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
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
