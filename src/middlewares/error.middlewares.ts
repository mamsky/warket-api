import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export type AppError = Error & {
  status?: number;
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Joi.ValidationError) {
    res.status(400).json({
      message: err.details[0].message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { message } = err;
    res.status(400).json({
      message: message || 'an error occurred in the database.',
    });
    return;
  }

  res
    .status(500)
    .json({ message: `Internal Server Error! Error: ${JSON.stringify(err)}` });
};
