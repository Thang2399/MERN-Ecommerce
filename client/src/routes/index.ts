import { authRoutes } from './auth.route';
import { publicRoutes } from './public.route';
import { privateRoutes } from './private.route';

const routes: any[] = [
    ...publicRoutes,
    ...privateRoutes,
    ...authRoutes
];

export default routes;