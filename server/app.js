import express, { json } from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';

import cardRouter from './routes/cardRoutes.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use('/', cardRouter);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

export default app;
