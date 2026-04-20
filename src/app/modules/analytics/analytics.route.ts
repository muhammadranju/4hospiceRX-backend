import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get(
  '/users',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  AnalyticsController.getAllUsersLeads,
);

router.get(
  '/statistics',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  AnalyticsController.getStatistics,
);

router.get(
  '/chart-data',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  AnalyticsController.getChartData,
);

export const AnalyticsRoutes = router;
