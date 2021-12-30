import { Router } from 'express';
import DnaController from '../controllers/DnaController';
import validateRequest from '../middlewares/validateRequest';

const dnaRouter = Router();
const dnaController = new DnaController();

dnaRouter.post('/mutant/',validateRequest, dnaController.create);

export default dnaRouter;
