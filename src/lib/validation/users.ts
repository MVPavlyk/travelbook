import { z } from 'zod';

export const UserMessages = {
  firstNameMin: 'First name must be at least 2 characters.',
  lastNameMin: 'Last name must be at least 2 characters.',
  emailInvalid: 'Please enter a valid email address.',
  passwordMin: 'Password must be at least 8 characters.',
};

export const signUpSchema = z.object({
  firstName: z.string().trim().min(2, UserMessages.firstNameMin),
  lastName: z.string().trim().min(2, UserMessages.lastNameMin),
  email: z.string().trim().email(UserMessages.emailInvalid),
  password: z.string().min(8, UserMessages.passwordMin),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2, UserMessages.firstNameMin),
  lastName: z.string().trim().min(2, UserMessages.lastNameMin),
});
