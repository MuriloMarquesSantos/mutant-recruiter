import { Router } from 'express';

import dnaRouter from './dna.routes';
import statsRouter from './stats.routes';

const routes = Router();

routes.use(dnaRouter);
routes.use(statsRouter);

export default routes;
