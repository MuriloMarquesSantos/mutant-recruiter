import DnaModel from '../models/Dna';
import DnaRequest from '../../../domain/dtos/DnaRequest';
import AppError from '../../../shared/errors/AppError';
import IDnaRepository from './IDnaRepository';

export default class DnaRepository implements IDnaRepository {
    async save(dna: DnaRequest) {
        try {
            const savedDna = await DnaModel.create(dna);
            return savedDna;
        } catch(error) {
            console.error(error)
            throw new AppError("Persistence Error", 500);
        }
    }
}
