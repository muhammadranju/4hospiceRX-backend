import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import { LeadsService } from './leads.service';

const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await LeadsService.createLeadInDB(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Lead created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await LeadsService.getAllLeadsFromDB(req.query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Leads fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const LeadsController = {
  getAllLeads,
  createLead,
};
