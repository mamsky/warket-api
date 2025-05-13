import express from 'express';
import groupRoute from './routes/group.routes';
import { errorHandler } from './middlewares/error.middlewares';
import cors from 'cors';
import { corsOption } from './config/cors.config';

const app = express();
app.use(cors(corsOption));
app.use(express.json());

app.use('/', groupRoute);
app.use(errorHandler);

export default app;
