import React, { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import Link from 'next/link';

type TLinkAsButton = {
  variant?: 'primary' | 'secondary';
  size?: 'big' | 'small';
  className?: string;
  href: string;
  children?: ReactNode | string;
};

export type TButtonElementProps = TLinkAsButton;

const LinkAsButton: FC<TButtonElementProps> = (props) => {
  const {
    variant = 'primary',
    size = 'big',
    children,
    href,
    className,
  } = props;

  return (
    <Link
      href={href}
      className={twMerge(
        classNames(
          'cursor-pointer rounded-[5px] border-none font-bold outline-none transition-all flex items-center justify-center',
          variant === 'primary' && 'bg-iris-100 text-white',
          size === 'big' ? 'h-11 px-8 text-sm font-bold' : 'h-9 px-4 text-xs',
          className
        )
      )}
    >
      {children}
    </Link>
  );
};

export default LinkAsButton;
