import express, { Request, Response, NextFunction, Router } from 'express';
import AppError from '../../..//shared/errors/AppError';

import dnaRouter from './dna.routes';
import statsRouter from './stats.routes';

const appRoutes = Router();

appRoutes.use(dnaRouter);
appRoutes.use(statsRouter);

const app = express();
app.use(express.json());
app.use(appRoutes);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
    },
  );

export default app;
