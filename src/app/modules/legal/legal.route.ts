import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { LegalController } from './legal.controller';

const router = express.Router();

router.get('/:type', LegalController.getLegalDocumentByType);

router.patch(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  LegalController.updateLegalDocument,
);

export const LegalRoutes = router;
