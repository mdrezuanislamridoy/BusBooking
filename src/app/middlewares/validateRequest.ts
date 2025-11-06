/* eslint-disable @typescript-eslint/no-explicit-any */
// middlewares/validateRequest.ts

import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Something went wrong during validation',
      });
    }
  };
};

export default validateRequest;
