import { Schema, model } from 'mongoose';
import { ILegalDocument } from './legal.interface';

const legalDocumentSchema = new Schema<ILegalDocument>(
  {
    type: {
      type: String,
      enum: ['privacy', 'terms'],
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

export const LegalDocument = model<ILegalDocument>('LegalDocument', legalDocumentSchema);
