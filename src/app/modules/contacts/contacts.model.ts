import { Schema, model } from 'mongoose';
import { IContact } from './contacts.interface';

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    hospice: { type: String, required: true },
    message: { type: String, required: true },
    attachFiles: { type: String, required: false },
  },
  { timestamps: true },
);

export const Contact = model<IContact>('Contact', contactSchema);
