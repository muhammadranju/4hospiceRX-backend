import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { LeadsController } from './leads.controller';

const router = express.Router();

router.post('/', LeadsController.createLead);
router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  LeadsController.getAllLeads,
);

export const LeadsRoutes = router;
