import { Schema, model, Types } from 'mongoose';

const toolUsageSchema = new Schema(
  {
    toolId: {
      type: Types.ObjectId,
      ref: 'Tools',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: false, // Optional if guest usage is allowed
    },
  },
  {
    timestamps: true,
  },
);

export const ToolUsage = model('ToolUsage', toolUsageSchema);
