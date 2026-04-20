import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Tools } from './tools.model';
import type { ITools } from './tools.interface';
import { ToolUsage } from './toolUsage.model';

const createToolInDB = async (payload: ITools) => {
  const result = await Tools.create(payload);
  return result;
};

const getToolsStatsFromDB = async () => {
  const totalTools = await Tools.countDocuments();
  const activeTools = await Tools.countDocuments({ status: 'active' });

  const usageAggregation = await Tools.aggregate([
    {
      $group: {
        _id: null,
        totalUsage: { $sum: '$totalUse' },
      },
    },
  ]);

  const totalUsage = usageAggregation[0]?.totalUsage || 0;
  const avgDailyUsage = (totalUsage / 30).toFixed(1);

  return {
    totalTools,
    activeTools,
    totalUsage,
    avgDailyUsage,
  };
};

const getAllToolsFromDB = async () => {
  const result = await Tools.find().sort({ createdAt: -1 });
  return result;
};

const updateToolStatusInDB = async (id: string, status: string) => {
  const result = await Tools.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

const trackToolUsageInDB = async (toolId: string, userId?: string) => {
  // Increment totalUse in Tools model
  const updatedTool = await Tools.findByIdAndUpdate(
    toolId,
    { $inc: { totalUse: 1 } },
    { new: true }
  );

  if (!updatedTool) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Tool not found');
  }

  // Create usage log
  const result = await ToolUsage.create({
    toolId,
    user: userId,
  });
  return result;
};

export const ToolsService = {
  getToolsStatsFromDB,
  createToolInDB,
  getAllToolsFromDB,
  updateToolStatusInDB,
  trackToolUsageInDB,
};
