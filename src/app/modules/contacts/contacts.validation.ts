import { z } from 'zod';

const createContactZodSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }),
    email: z
      .string({
        message: 'Email is required',
      })
      .email(),
    hospice: z.string({
      message: 'Hospice name is required',
    }),
    message: z.string({
      message: 'Message is required',
    }),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
};
