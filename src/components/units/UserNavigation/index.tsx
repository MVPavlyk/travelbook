import React from 'react';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import LinkAsButton from '@/components/elements/LinkAsButton';
import UserIcon from '@/assets/icons/UserIcon';
import { getSession } from '@/lib/auth/getAuth';
import LogoutButton from '@/components/units/LogoutButton';

const UserNavigation = async () => {
  const session = await getSession();

  if (!session) {
    return <LinkAsButton href={STATIC_ROUTES.LOGIN}>Login</LinkAsButton>;
  }

  const { firstName, lastName } = session.user;

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2">
        <UserIcon />
        <p className="text-green-50 font-medium">
          {firstName} {lastName}
        </p>
      </div>
      <LogoutButton />
    </div>
  );
};

export default UserNavigation;
