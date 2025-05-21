import NextAuth, { DefaultSession } from 'next-auth';

type TUserRole = 'admin' | 'user';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl: string;
      role: TUserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    role: TUserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    role: TUserRole;
  }
}
