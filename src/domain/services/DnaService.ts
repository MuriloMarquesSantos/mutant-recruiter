import DnaRepository from "../../infra/database/repositories/DnaRepository";
import DnaDiagonalSearcher from "../searchers/DnaDiagonalSearcher";
import DnaHorizontalSearcher from "../searchers/DnaHorizontalSearcher";
import DnaVerticalSearcher from "../searchers/DnaVerticalSearcher";

export default class DnaService {
    private dnaRepository: DnaRepository;
    constructor() {
        this.dnaRepository = new DnaRepository();
    }
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    // TODO -> VALIDATE CUBES SMALLER THAN 4x4.. Impossible to have mutant DNA if they have that size
    async isMutant(testDna: string[]): Promise<boolean> {
        const joinTestDna = testDna.join('');
        const diagonalSearcher = new DnaDiagonalSearcher();
        const horizontalSearcher = new DnaHorizontalSearcher();
        const verticalSearcher = new DnaVerticalSearcher();
        
        const horizontalMatchCounter = horizontalSearcher.searchHorizontally(testDna);
        const verticalMatchCounter = verticalSearcher.searchVertically(testDna);
        const diagonalMatchCounter = diagonalSearcher.searchDiagonally(testDna);

        let dnaMatchCounter = 0;
        dnaMatchCounter = horizontalMatchCounter + verticalMatchCounter + diagonalMatchCounter;
        if (dnaMatchCounter >= this.MATCH_DNA_SEQUENCE_TARGET) {
            const savedDna = await this.dnaRepository.save({
                dna: joinTestDna,
                isMutant: true,
            });
            console.log(savedDna);
            return true;
        }
        const savedDna = await this.dnaRepository.save({
            dna: joinTestDna,
            isMutant: false,
        });
        console.log(savedDna);
        return false;
    }
}
