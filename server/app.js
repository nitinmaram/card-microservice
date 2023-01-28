import express, { json } from 'express';
import logger from 'morgan';

import cardRouter from './routes/cardRoutes.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use('/', cardRouter);

export default app;
