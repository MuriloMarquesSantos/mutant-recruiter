import { Router } from 'express';
import StatsController from '../controllers/StatsController';

const statsRouter = Router();
const statsController = new StatsController();

statsRouter.get('/stats/', statsController.get);

export default statsRouter;
