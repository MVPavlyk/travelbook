import { z } from 'zod';

export const CreateCommentMessages = {
  postId: 'Post ID is required.',
  textMin: 'Comment must be at least 2 characters.',
  textMax: 'Comment is too long.',
  imagesCount: (n: number) => `You can upload up to ${n} images.`,
} as const;

export const MAX_COMMENT_IMAGES = 10;

export const createCommentSchema = z.object({
  postId: z.coerce.number().int().positive(CreateCommentMessages.postId),
  text: z
    .string()
    .trim()
    .min(2, CreateCommentMessages.textMin)
    .max(5000, CreateCommentMessages.textMax),
});
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
