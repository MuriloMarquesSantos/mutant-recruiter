import { injectable, inject } from "tsyringe";
import IDnaRepository from "../../infra/database/repositories/IDnaRepository";
import AppError from "../../shared/errors/AppError";
import StatsResponse from "../dtos/StatsResponse";
 
@injectable()
export default class StatsService {
    private dnaRepository: IDnaRepository;
    constructor(
        @inject('DnaRepository')
        dnaRepository: IDnaRepository,
    ) {
        this.dnaRepository = dnaRepository;    
    }

    async getDnaStats(): Promise<StatsResponse> {
        try {
            return this.dnaRepository.getCountByIsMutant();
        } catch(error) {
            throw new AppError("Could not retrieve Dna stats", 500);
        }       
    }
}
