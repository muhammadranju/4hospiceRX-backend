import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { ContactRoutes } from '../app/modules/contacts/contacts.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { LeadsRoutes } from '../app/modules/leads/leads.route';
import { AnalyticsRoutes } from '../app/modules/analytics/analytics.route';
import { ToolsRoutes } from '../app/modules/tools/tools.route';
import { LegalRoutes } from '../app/modules/legal/legal.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/leads',
    route: LeadsRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
  {
    path: '/tools',
    route: ToolsRoutes,
  },
  {
    path: '/legal',
    route: LegalRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
