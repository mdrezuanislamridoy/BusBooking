import { Router } from 'express';
import { createRoute, getRoute, getRoutes } from './route.controller';

const router = Router();

router.post('/createRoute', createRoute);
router.post('/getRoute/:id', getRoute);
router.post('/getRoute', getRoutes);

export const RouteRoute = router;
