'use client';

import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

type Option = {
  label: string;
  value: string;
};

interface SelectInputProps {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  isClearable?: boolean;
  placeholder?: string;
}

export default function SelectInput({
  name,
  label,
  options,
  className,
  isClearable = false,
  placeholder,
}: SelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValue = options.find(
            (opt) => opt.value === field.value
          );

          const handleChange = (option: Option | null) => {
            field.onChange(option?.value ?? '');
          };

          return (
            <Select
              inputId={name}
              options={options}
              value={selectedValue}
              onChange={handleChange}
              isClearable={isClearable}
              placeholder={placeholder || `Select ${label || name}`}
              className={twMerge(classNames('w-full', className))}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  width: '100%',
                  minHeight: '40px',
                  borderColor: '#d1d5db',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#d1d5db',
                  },
                  borderRadius: '0.375rem',
                  paddingLeft: '0.5rem',
                }),
                valueContainer: (base) => ({
                  ...base,
                  paddingLeft: 0,
                }),
                placeholder: (base) => ({
                  ...base,
                  textAlign: 'left',
                }),
                singleValue: (base) => ({
                  ...base,
                  textAlign: 'left',
                }),
                menu: (base) => ({
                  ...base,
                  textAlign: 'left',
                }),
                option: (base, state) => ({
                  ...base,
                  textAlign: 'left',
                  backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: 'pointer',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#f3f4f6',
                  primary: '#d1d5db',
                },
              })}
            />
          );
        }}
      />

      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name]?.message as string) || 'Invalid input'}
        </span>
      )}
    </div>
  );
}
