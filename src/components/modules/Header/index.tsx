import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/images/logo.png';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import UserNavigation from '@/components/units/UserNavigation';

const Header = () => {
  return (
    <header className="w-full h-20 bg-gray-100 px-60 flex items-center justify-between">
      <Link href={STATIC_ROUTES.HOME}>
        <Image src={logo} alt="logo" width={150} height={36} />
      </Link>
      <UserNavigation />
    </header>
  );
};

export default Header;
