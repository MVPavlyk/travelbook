import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

type TButton = {
  variant?: 'primary' | 'secondary';
  size?: 'big' | 'small';
  disabled?: boolean;
  className?: string;
  children?: ReactNode | string;
};

export type TButtonElementProps = TButton &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<TButtonElementProps> = (props) => {
  const {
    disabled,
    variant = 'primary',
    size = 'big',
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={twMerge(
        classNames(
          'cursor-pointer rounded-[5px] border-none font-bold outline-none transition-all',
          variant === 'primary' && 'bg-iris-100 text-white',
          size === 'big' ? 'h-11 px-8 text-sm font-bold' : 'h-9 px-4 text-xs',
          disabled && 'pointer-events-none opacity-40',
          className
        )
      )}
    >
      {children}
    </button>
  );
};

export default Button;
