import { z } from 'zod';

export const CreatePostMessages = {
  titleMin: 'Minimum 3 characters.',
  countryRequired: 'Please select a country.',
  durationPattern: `Use a format like "5 days" or "2w".`,
  impressionRange: 'Impression must be an integer between 0 and 10.',
  costRange: 'Approximate cost must be between 0 and 50,000.',
  descriptionMin: 'Minimum 10 characters.',
} as const;

export const createPostSchema = z.object({
  title: z.string().trim().min(3, CreatePostMessages.titleMin),
  country: z.string().trim().min(1, CreatePostMessages.countryRequired),
  duration: z
    .string()
    .trim()
    .regex(/^\d+\s*(d(ays?)?|w(eeks?)?)$/i, CreatePostMessages.durationPattern),
  impression: z.coerce
    .number()
    .int()
    .min(0)
    .max(10, CreatePostMessages.impressionRange),
  approximateCost: z.coerce
    .number()
    .min(0)
    .max(50000, CreatePostMessages.costRange),
  description: z.string().trim().min(10, CreatePostMessages.descriptionMin),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
