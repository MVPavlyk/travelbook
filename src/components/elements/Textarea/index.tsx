'use client';

import { TextareaHTMLAttributes } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export default function Textarea({
  name,
  label,
  placeholder,
  className,
  rows = 4,
  ...props
}: TextareaFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 items-start">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            rows={rows}
            className={twMerge(
              classNames(
                'border p-2 rounded-md w-[320px] focus:ring-2 focus:ring-blue-500 outline-none resize-none',
                className
              )
            )}
            {...props}
          />
        )}
      />

      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name]?.message as string) || 'Invalid input'}
        </span>
      )}
    </div>
  );
}
