import { Router } from 'express';

import dnaRouter from './dna.routes';

const routes = Router();

routes.use(dnaRouter);

export default routes;
