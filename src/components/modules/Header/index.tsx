import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/images/logo.png';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import UserNavigation from '@/components/units/UserNavigation';
import { getSession } from '@/lib/auth/getAuth';

const Header = async () => {
  const session = await getSession();

  return (
    <header className="w-full h-20 bg-gray-100 px-60 flex items-center justify-between">
      <Link href={STATIC_ROUTES.HOME}>
        <Image src={logo} alt="logo" width={150} height={36} />
      </Link>
      {session && (
        <Link
          className="text-xl no-underline hover:underline text-iris-100"
          href={STATIC_ROUTES.CREATE_POST}
        >
          Create Post
        </Link>
      )}
      <UserNavigation />
    </header>
  );
};

export default Header;
