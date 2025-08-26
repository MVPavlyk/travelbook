'use client';

import dynamic from 'next/dynamic';

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

export type Option = { label: string; value: string };

type Props = {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  isClearable?: boolean;
  placeholder?: string;
};

export default function Select({
  name,
  label,
  options,
  className,
  isClearable = false,
  placeholder,
}: Props) {
  const { errors, values } = useFormStateCtx();
  const error = errors?.[name];

  const initial = useMemo(
    () => options.find((o) => o.value === values?.[name]) ?? null,
    [options, values?.[name]]
  );
  const [value, setValue] = useState<Option | null>(initial);

  return (
    <div
      suppressHydrationWarning
      className="flex flex-col gap-2 items-start w-full"
    >
      {label && (
        <label htmlFor={`select-input-${name}`} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input type="hidden" name={name} value={value?.value ?? ''} />

      <ReactSelect
        instanceId={`select-${name}`}
        inputId={`select-input-${name}`}
        options={options}
        value={value}
        defaultMenuIsOpen={false}
        onChange={(opt) => setValue((opt as Option) ?? null)}
        isClearable={isClearable}
        placeholder={placeholder || `Select ${label || name}`}
        className={twMerge(classNames('w-full', className))}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            width: '100%',
            minHeight: '40px',
            borderColor: error ? '#ef4444' : '#d1d5db',
            boxShadow: 'none',
            '&:hover': { borderColor: error ? '#ef4444' : '#d1d5db' },
            borderRadius: '0.375rem',
            paddingLeft: '0.5rem',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#d1d5db' },
        })}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
