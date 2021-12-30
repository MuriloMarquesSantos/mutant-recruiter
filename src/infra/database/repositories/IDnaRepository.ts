import DnaRequest from "../../../domain/dtos/DnaRequest";

export default interface IDnaRepository {
    save(dna: DnaRequest): void;
}