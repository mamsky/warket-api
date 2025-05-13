import { NextFunction, Request, Response } from 'express';

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hallo Register');
  } catch (error) {
    next(error);
  }
};
