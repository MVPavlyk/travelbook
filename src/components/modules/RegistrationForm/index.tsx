'use client';

import React, { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import Link from 'next/link';
import { signUpAction } from '@/actions/user/signUpAction';

type RegistrationUser = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

const RegistrationForm = () => {
  const methods = useForm<RegistrationUser>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegistrationUser) => {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        await signUpAction(data);
        router.push(STATIC_ROUTES.LOGIN);
      } catch (error: any) {
        setErrorMessage(error.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="text-center flex flex-col items-center">
      <h3 className="text-4xl text-gray-700 font-semibold mb-10">Sign Up</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-[320px]"
        >
          <Input
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
          />
          <Input
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button className="bg-green-100" disabled={isPending}>
            {isPending ? 'Wait...' : 'Submit'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link
            href={STATIC_ROUTES.LOGIN}
            className="text-gray-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </FormProvider>
    </div>
  );
};

export default RegistrationForm;
