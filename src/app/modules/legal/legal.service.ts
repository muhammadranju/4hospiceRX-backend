import { ILegalDocument } from './legal.interface';
import { LegalDocument } from './legal.model';

const updateLegalDocumentInDB = async (payload: ILegalDocument) => {
  const result = await LegalDocument.findOneAndUpdate(
    { type: payload.type },
    payload,
    { new: true, upsert: true }
  );
  return result;
};

const getLegalDocumentByTypeFromDB = async (type: string) => {
  const result = await LegalDocument.findOne({ type });
  return result;
};

export const LegalService = {
  updateLegalDocumentInDB,
  getLegalDocumentByTypeFromDB,
};
