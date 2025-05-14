import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { authorization } = req.headers;

    if (!authorization) {
      res.status(500).json({ message: 'Unauthorize!!!' });
      return;
    }

    if (authorization?.split(' ').length > 1) {
      authorization = authorization?.split(' ')[1];
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const isVerified = jwt.verify(authorization, secretKey);
    (req as any).users = isVerified;
    console.log('from middleware', isVerified);
    next();
  } catch (error) {
    next(error);
  }
};
