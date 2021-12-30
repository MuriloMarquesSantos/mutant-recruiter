import DnaRequest from "../../../../domain/dtos/DnaRequest";
import StatsResponse from "../../../../domain/dtos/StatsResponse";
import IDnaRepository from "../IDnaRepository";

export default class FakeDnaRepository implements IDnaRepository {
    private dnas: DnaRequest[] = [];
    async save(dna: DnaRequest) {
        this.dnas.push(dna);

        return dna;
    }

    async getCountByIsMutant(): Promise<StatsResponse> {
        const count_mutant_dna = this.dnas.filter(dna => dna.isMutant === true).length;
        const count_human_dna = this.dnas.filter(dna => dna.isMutant === false).length
        const ratio = count_mutant_dna / count_human_dna;
        return {
            count_mutant_dna,
            count_human_dna,
            ratio
        }
    }
}
