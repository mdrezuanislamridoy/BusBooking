import { NextFunction, Request, Response } from 'express';
import { Route } from './route.model';

const createRoute = async (req: Request) => {
  return await Route.create(req.body);
};
const getRoutes = async (req: Request) => {
  return await Route.find();
};
const getRoute = async (req: Request) => {
  return await Route.find({ _id: req.params.id });
};

export const RouteService = {
  createRoute,
  getRoutes,
  getRoute,
};
