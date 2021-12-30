import { Router } from 'express';

const dnaRouter = Router();

dnaRouter.post('/mutant/', (request, response) => response.end("hello"));

export default dnaRouter;
