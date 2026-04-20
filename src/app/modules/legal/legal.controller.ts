import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LegalService } from './legal.service';

const updateLegalDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await LegalService.updateLegalDocumentInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Legal document updated successfully',
    data: result,
  });
});

const getLegalDocumentByType = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LegalService.getLegalDocumentByTypeFromDB(
      req.params.type as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Legal document retrieved successfully',
      data: result,
    });
  },
);

export const LegalController = {
  updateLegalDocument,
  getLegalDocumentByType,
};
