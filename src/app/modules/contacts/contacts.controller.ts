import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contacts.service';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createContactToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact created successfully',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getAllContactsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contacts retrieved successfully',
    data: result,
  });
});

const getSingleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.getSingleContactFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact retrieved successfully',
    data: result,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.deleteContactFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact deleted successfully',
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
  getSingleContact,
  deleteContact,
};
