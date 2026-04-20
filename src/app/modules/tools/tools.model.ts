import { Schema, model } from 'mongoose';

const toolsSchema = new Schema(
  {
    toolName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    totalUse: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export const Tools = model('Tools', toolsSchema);
