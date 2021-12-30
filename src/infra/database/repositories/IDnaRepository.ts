import DnaRequest from "../../../domain/dtos/DnaRequest";
import StatsResponse from "../../../domain/dtos/StatsResponse";

export default interface IDnaRepository {
    save(dna: DnaRequest): void;
    getCountByIsMutant(): Promise<StatsResponse>
}