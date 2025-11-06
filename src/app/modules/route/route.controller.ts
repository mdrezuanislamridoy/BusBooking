import { NextFunction, Request, Response } from 'express';
import { RouteService } from './route.service';

export const createRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const route = await RouteService.createRoute(req);
    if (!route) {
      throw new Error('Route creation failed');
    }
    res.status(201).json({
      success: true,
      message: 'Route creation successful',
      route,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const route = await RouteService.getRoute(req);
    if (!route) {
      throw new Error('Route not found');
    }
    res.status(201).json({
      success: true,
      message: 'Route fetched successfully',
      route,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const routes = await RouteService.getRoutes(req);
    if (routes.length < 1) {
      throw new Error('Routes not found');
    }
    res.status(201).json({
      success: true,
      message: 'Routes are fetched',
      routes,
    });
  } catch (error) {
    next(error);
  }
};
