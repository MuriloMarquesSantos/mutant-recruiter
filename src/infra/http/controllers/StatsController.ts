import { Request, Response } from 'express';
import DnaService from '../../../domain/services/DnaService';
import { container } from 'tsyringe';

export default class StatsController {
    public async get(request: Request, response: Response): Promise<Response> {
        const dnaService = container.resolve(DnaService);
        try {

            return response.status(200).json(response);
        }
        catch (error) {
            return response.status(500).json(error);
        }
    }
}