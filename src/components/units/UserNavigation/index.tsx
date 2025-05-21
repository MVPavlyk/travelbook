import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import LogoutButton from '@/components/units/LogoutButton';
import UserUpdateModal from '@/components/modules/UpdateUserModal';
import LinkAsButton from '@/components/elements/LinkAsButton';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';

const UserNavigation = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LinkAsButton href={STATIC_ROUTES.LOGIN}>Login</LinkAsButton>;
  }

  return (
    <div className="flex items-center gap-x-3">
      {!!session?.user && <UserUpdateModal user={session?.user} />}
      <LogoutButton />
    </div>
  );
};

export default UserNavigation;
