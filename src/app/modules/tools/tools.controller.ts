import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ToolsService } from './tools.service';

const createTool = catchAsync(async (req: Request, res: Response) => {
  const result = await ToolsService.createToolInDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tool created successfully',
    data: result,
  });
});

const getToolsStats = catchAsync(async (req: Request, res: Response) => {
  const result = await ToolsService.getToolsStatsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tools statistics retrieved successfully',
    data: result,
  });
});

const getAllTools = catchAsync(async (req: Request, res: Response) => {
  const result = await ToolsService.getAllToolsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All tools retrieved successfully',
    data: result,
  });
});

const updateToolStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await ToolsService.updateToolStatusInDB(id as string, status);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tool status updated successfully',
    data: result,
  });
});

const trackToolUsage = catchAsync(async (req: Request, res: Response) => {
  const { toolId } = req.body;
  const userId = req.user?.id; // Assumes auth middleware populates req.user

  const result = await ToolsService.trackToolUsageInDB(toolId, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tool usage tracked successfully',
    data: result,
  });
});

export const ToolsController = {
  createTool,
  getToolsStats,
  getAllTools,
  updateToolStatus,
  trackToolUsage,
};
