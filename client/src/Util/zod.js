import { z } from 'zod';

export const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    number: z.string().optional(),
  });