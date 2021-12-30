import { Request, Response } from 'express';
import { container } from 'tsyringe';
import StatsService from '../../../domain/services/StatsService';

export default class StatsController {
    public async get(_: Request, response: Response): Promise<Response> {
        const statsService = container.resolve(StatsService);
        try {
            const statsResponse = await statsService.getDnaStats();
            return response.status(200).json(statsResponse);
        }
        catch (error) {
            return response.status(500).json({message: (error as Error).message});
        }
    }
}