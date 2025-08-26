import ServerActionForm from '@/components/units/ServerActionForm';
import Link from 'next/link';
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes';
import { signUpAction } from '@/actions/user/signUpAction';
import SubmitButton from '@/components/units/ServerActionForm/SubmitButton';
import Input from '@/components/elements/Input';

export default function RegistrationForm() {
  return (
    <div className="text-center flex flex-col items-center">
      <h3 className="text-4xl text-gray-700 font-semibold mb-10">Sign Up</h3>

      <ServerActionForm action={signUpAction} className="space-y-4 w-[320px]">
        <Input
          name="firstName"
          label="First Name"
          type="text"
          placeholder="John"
          required
        />
        <Input
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Doe"
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="john@doe.com"
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <SubmitButton>Submit</SubmitButton>
      </ServerActionForm>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <Link
          href={STATIC_ROUTES.LOGIN}
          className="text-gray-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
