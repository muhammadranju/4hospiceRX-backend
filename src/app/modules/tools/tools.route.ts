import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import maybeAuth from '../../middlewares/maybeAuth';
import { ToolsController } from './tools.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToolsController.createTool,
);

router.get(
  '/stats',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToolsController.getToolsStats,
);

router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToolsController.getAllTools,
);

router.patch(
  '/:id/status',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToolsController.updateToolStatus,
);

router.post('/track-usage', maybeAuth, ToolsController.trackToolUsage);

export const ToolsRoutes = router;
