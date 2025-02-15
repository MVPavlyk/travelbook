'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
}

export default function Input({
  name,
  label,
  type = 'text',
  placeholder,
  className,
  ...props
}: InputFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col gap-2 items-start`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={twMerge(
              classNames(
                'border p-2 rounded-md w-[320px] focus:ring-2 focus:ring-blue-500 outline-none',
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
