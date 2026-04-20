import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AnalyticsService } from './analytics.service';

const getAllUsersLeads = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.getAllUsersLeadsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users leads retrieved successfully',
    data: result,
  });
});

const getStatistics = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.getStatisticsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Statistics retrieved successfully',
    data: result,
  });
});

const getChartData = catchAsync(async (req: Request, res: Response) => {
  const toolUsage = await AnalyticsService.getToolUsageStats();
  const growthData = await AnalyticsService.getUserAndLeadGrowth();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Chart data retrieved successfully',
    data: {
      toolUsage,
      growthData,
    },
  });
});

export const AnalyticsController = {
  getAllUsersLeads,
  getStatistics,
  getChartData,
};
