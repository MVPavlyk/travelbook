'use client';

import Image from 'next/image';

type User = {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

type AvatarProps = {
  user: User;
  size?: number;
};

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

const avatarColors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-purple-500',
];

function hashColor(name: string): string {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export default function Avatar({ user, size = 40 }: AvatarProps) {
  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={`${user.firstName} ${user.lastName}`}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  const initials = getInitials(user.firstName, user.lastName);
  const color = hashColor(user.firstName + user.lastName);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold ${color}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
