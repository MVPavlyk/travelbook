'use client';

import { InputHTMLAttributes, useId, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'range';
  className?: string;
}

export default function Input({
  name,
  label,
  type = 'text',
  className,
  defaultValue,
  ...props
}: InputProps) {
  const id = useId();
  const { errors, values } = useFormStateCtx();
  const isRange = type === 'range';

  const initialRange = useMemo(() => {
    const v =
      values?.[name] ??
      (defaultValue as string | number | undefined) ??
      props.min ??
      0;
    return Number(v);
  }, [values?.[name], defaultValue, props.min]);

  const [rangeValue, setRangeValue] = useState<number>(Number(initialRange));
  const error = errors?.[name];

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      {isRange && (
        <div className="w-full grid grid-cols-3 text-sm text-gray-600 font-medium mb-1">
          <span className="justify-self-start">{props.min ?? 0}</span>
          <span className="justify-self-center text-blue-600">
            {rangeValue}
          </span>
          <span className="justify-self-end">{props.max ?? 100}</span>
        </div>
      )}

      <input
        id={id}
        name={name}
        type={type}
        defaultValue={values?.[name] ?? (defaultValue as any)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={twMerge(
          classNames(
            'border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none',
            isRange && 'focus:ring-0',
            error && 'border-red-500',
            className
          )
        )}
        onInput={
          isRange
            ? (e) => setRangeValue(Number((e.target as HTMLInputElement).value))
            : undefined
        }
        onInvalid={(e) => {
          const target = e.target as HTMLInputElement;
          if (!target.validity.valid && !error)
            target.setCustomValidity('Будь ласка, заповніть це поле коректно.');
        }}
        onChange={(e) => {
          (e.target as HTMLInputElement).setCustomValidity('');
        }}
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
