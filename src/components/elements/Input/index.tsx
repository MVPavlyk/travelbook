'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'range';
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

  const isRange = type === 'range';

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
          <>
            {isRange && (
              <div className="w-full grid grid-cols-3 text-sm text-gray-600 font-medium mb-1">
                <span className="justify-self-start">{props.min ?? 0}</span>
                <span className="justify-self-center text-blue-600">
                  {field.value}
                </span>
                <span className="justify-self-end">{props.max ?? 100}</span>
              </div>
            )}

            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={twMerge(
                classNames(
                  'border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none',
                  className,
                  isRange && 'focus:ring-0'
                )
              )}
              {...props}
            />
          </>
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
