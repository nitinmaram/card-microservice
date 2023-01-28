import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';
import { config } from 'dotenv';

import cardRouter from './routes/cardRoutes.js';

config();

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use('/', cardRouter);

export default app;
