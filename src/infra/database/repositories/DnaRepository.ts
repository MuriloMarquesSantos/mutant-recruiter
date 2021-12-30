import DnaModel from '../models/Dna';
import DnaRequest from '../../../domain/dtos/DnaRequest';
import AppError from '../../../shared/errors/AppError';
import IDnaRepository from './IDnaRepository';
import StatsResponse from '../../../domain/dtos/StatsResponse';

interface StatsDbResponse {
    _id: boolean,
    count: number,
}

export default class DnaRepository implements IDnaRepository {
    async save(dna: DnaRequest) {
        try {
            const savedDna = await DnaModel.create(dna);
            DnaModel.count()
            return savedDna;
        } catch(error) {
            console.error(error)
            throw new AppError("Persistence Error", 500);
        }
    }

    async getCountByIsMutant(): Promise<StatsResponse> {
        try {
            let dbResponse = await this.createStatsQuery();
            if (dbResponse === undefined || dbResponse.length === 0) {
                return this.buildEmptyStats();
            }
            return this.buildStatsResponse(dbResponse);
        }
        catch (error) {
            console.error(error)
            throw new AppError("Persistence Error", 500);
        }  
    }

    private async createStatsQuery() {
        return DnaModel.aggregate<StatsDbResponse>([
            {
                $group: {
                    _id: '$isMutant',
                    count: { $sum: 1 }
                }
            }
        ]);
    }

    private buildEmptyStats() {
        return {
            count_mutant_dna: 0,
            count_human_dna: 0,
            ratio: 0
        }
    }

    private buildStatsResponse(dbResponse: StatsDbResponse[]) {
        const count_mutant_dna = this.filterByIsMutant(dbResponse, true);
        const count_human_dna = this.filterByIsMutant(dbResponse, false);  
        const ratio = count_mutant_dna / count_human_dna;

        return {
            count_mutant_dna,
            count_human_dna,
            ratio
        }
    }

    private filterByIsMutant(dbResponse: StatsDbResponse[], isMutant: boolean): number {
        return dbResponse
            .find(element => element._id === isMutant)!!.count;
    }
}
