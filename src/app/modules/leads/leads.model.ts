import { Schema, model } from 'mongoose';

const leadsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Leads = model('Leads', leadsSchema);
