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
        return {
            count_mutant_dna: 2,
            count_human_dna: 1,
            ratio: 0.5,
        }
    }
}
