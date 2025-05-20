'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import Link from 'next/link';

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
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegistrationUser) => {
    setLoading(true);
    setErrorMessage(null);

    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(resData.error || 'Something went wrong');
      return;
    }

    router.push(STATIC_ROUTES.LOGIN);
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
            placeholder="1111"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button className="bg-green-100">
            {loading ? 'Wait...' : 'Submit'}
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
