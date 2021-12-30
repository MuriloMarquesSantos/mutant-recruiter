import { Router } from 'express';
import DnaController from '../controllers/DnaController';

const dnaRouter = Router();
const dnaController = new DnaController();

dnaRouter.post('/mutant/', dnaController.create);

export default dnaRouter;
