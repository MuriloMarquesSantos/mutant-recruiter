import { Request, Response } from 'express';
import DnaService from '../../../domain/services/DnaService';

export default class DnaController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { dna } = request.body;
        const dnaService = new DnaService();

        const isMutantResponse = dnaService.isMutant(dna);
        return response.status(200).json(isMutantResponse);
    }
}