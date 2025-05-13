import express, { Request, Response } from 'express';
import authRouter from './auth.routes';
const route = express.Router();

route.use('/auth', authRouter);

export default route;
