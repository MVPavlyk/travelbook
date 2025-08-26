import { z } from 'zod';

export const SignUpMessages = {
  firstNameMin: 'First name must be at least 2 characters.',
  lastNameMin: 'Last name must be at least 2 characters.',
  emailInvalid: 'Please enter a valid email address.',
  passwordMin: 'Password must be at least 8 characters.',
} as const;

export const signUpSchema = z.object({
  firstName: z.string().trim().min(2, SignUpMessages.firstNameMin),
  lastName: z.string().trim().min(2, SignUpMessages.lastNameMin),
  email: z.string().trim().email(SignUpMessages.emailInvalid),
  password: z.string().min(8, SignUpMessages.passwordMin),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
