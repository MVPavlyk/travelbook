'use client';

import { TextareaHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  rows?: number;
  className?: string;
}

export default function Textarea({
  name,
  label,
  rows = 4,
  className,
  defaultValue,
  ...props
}: Props) {
  const id = useId();
  const { errors, values } = useFormStateCtx();
  const error = errors?.[name];

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={values?.[name] ?? (defaultValue as any)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={twMerge(
          classNames(
            'border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none resize-none',
            error && 'border-red-500',
            className
          )
        )}
        onInvalid={(e) => {
          const t = e.target as HTMLTextAreaElement;
          if (!t.validity.valid && !error)
            t.setCustomValidity('Please fill in this field.');
        }}
        onChange={(e) =>
          (e.target as HTMLTextAreaElement).setCustomValidity('')
        }
        {...props}
      />

      {error && (
        <span id={`${id}-error`} className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}
