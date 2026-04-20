import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IContact } from './contacts.interface';
import { Contact } from './contacts.model';

const createContactToDB = async (payload: IContact): Promise<IContact> => {
  const result = await Contact.create(payload);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create contact');
  }
  return result;
};

const getAllContactsFromDB = async (): Promise<IContact[]> => {
  const result = await Contact.find();
  return result;
};

const getSingleContactFromDB = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Contact not found');
  }
  return result;
};

const deleteContactFromDB = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Contact not found');
  }
  return result;
};

export const ContactService = {
  createContactToDB,
  getAllContactsFromDB,
  getSingleContactFromDB,
  deleteContactFromDB,
};
