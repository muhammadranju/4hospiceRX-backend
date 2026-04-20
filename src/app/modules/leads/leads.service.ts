import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Leads } from './leads.model';

const createLeadInDB = async (payload: any) => {
  const exists = await Leads.findOne({ email: payload.email });
  if (exists) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You are already a lead');
  }

  const lead = await Leads.create(payload);
  if (!lead) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create lead');
  }
  return lead;
};

const getAllLeadsFromDB = async (queryParams: any) => {
  const { searchTerm, page = 1, limit = 10 } = queryParams;

  const pageNo = Number(page);
  const limitNo = Number(limit);
  const skip = (pageNo - 1) * limitNo;

  let whereCondition = {};

  if (searchTerm) {
    whereCondition = {
      $or: [{ email: { $regex: searchTerm, $options: 'i' } }],
    };
  }

  const leads = await Leads.find(whereCondition)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Leads.countDocuments(whereCondition);
  const totalPages = Math.ceil(total / limitNo);

  if (!leads) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to get leads');
  }
  return {
    leads,
    meta: {
      page: pageNo,
      limit: limitNo,
      total,
      totalPages,
    },
  };
};

export const LeadsService = {
  createLeadInDB,
  getAllLeadsFromDB,
};
