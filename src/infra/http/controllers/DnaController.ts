import { Request, Response } from 'express';
import DnaService from '../../../domain/services/DnaService';
import { container } from 'tsyringe';

export default class DnaController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { dna } = request.body;
        const dnaService = container.resolve(DnaService);
        try {
            const isMutantResponse = await dnaService.isMutant(dna);
            const statusCode = isMutantResponse.isMutant ? 200 : 403;
            return response.status(statusCode).json(isMutantResponse);
        }
        catch (error) {
            return response.status(500).json(error);
        }
    }
}