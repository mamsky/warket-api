import express from 'express';
import groupRoute from './routes/group.routes';
import { errorHandler } from './middlewares/error.middlewares';

const app = express();
app.use(express.json());

app.use('/', groupRoute);

app.use(errorHandler);

export default app;
