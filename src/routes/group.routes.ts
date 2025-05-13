import express, { Request, Response } from 'express';
const route = express.Router();

route.get('/', (req: Request, res: Response) => {
  res.send('hallo group route');
});

export default route;
