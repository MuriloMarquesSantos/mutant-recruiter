import DnaRequest from "../../../../domain/dtos/DnaRequest";
import IDnaRepository from "../IDnaRepository";

export default class FakeDnaRepository implements IDnaRepository {
    private dnas: DnaRequest[] = [];
    async save(dna: DnaRequest) {
        this.dnas.push(dna);

        return dna;
    }
}
