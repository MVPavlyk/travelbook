import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/images/logo.png';
import Button from '@/components/elements/Button';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';

const Header = () => {
  return (
    <header className="w-full h-20 bg-gray-100 px-60 flex items-center justify-between">
      <Link href={STATIC_ROUTES.HOME}>
        <Image src={logo} alt="logo" width={150} height={36} />
      </Link>
      <Button>Login</Button>
    </header>
  );
};

export default Header;
