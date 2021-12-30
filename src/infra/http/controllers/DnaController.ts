import { Request, Response } from 'express';
import DnaService from '../../../domain/services/DnaService';

export default class DnaController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { dna } = request.body;
        const dnaService = new DnaService();
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