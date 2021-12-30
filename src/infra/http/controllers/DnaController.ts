import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import "reflect-metadata";
import DnaService from '../../../domain/services/DnaService';


@injectable()
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
            return response.status(500).json({message: (error as Error).message});
        }
    }
}