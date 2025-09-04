'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@/components/units/Avatar';
import { useRouter } from 'next/navigation';
import type { User } from '@prisma/client';
import Modal from '@/components/elements/Modal';
import UserUpdateForm from '@/components/modules/UpdateUserModal/UserUpdateForm';
import { UI_EVENTS } from '@/lib/constants/uiEvents';

type Props = {
  user: User;
  eventName?: string;
};

export default function UserUpdateModal({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
      router.refresh();
    };
    window.addEventListener(UI_EVENTS.user.updated, handler as EventListener);
    return () =>
      window.removeEventListener(
        UI_EVENTS.user.updated,
        handler as EventListener
      );
  }, [router]);

  return (
    <>
      <div
        className="flex items-center gap-x-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Avatar user={user} />
        <p className="text-green-50 font-medium">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Profile"
      >
        <UserUpdateForm user={user} />
      </Modal>
    </>
  );
}
