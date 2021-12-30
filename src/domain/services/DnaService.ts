import DnaDiagonalSearcher from "../searchers/DnaDiagonalSearcher";
import DnaHorizontalSearcher from "../searchers/DnaHorizontalSearcher";
import DnaVerticalSearcher from "../searchers/DnaVerticalSearcher";

export default class DnaService {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    // TODO -> VALIDATE CUBES SMALLER THAN 4x4.. Impossible to have mutant DNA if they have that size
    isMutant(testDna: string[]): boolean {
        const diagonalSearcher = new DnaDiagonalSearcher();
        const horizontalSearcher = new DnaHorizontalSearcher();
        const verticalSearcher = new DnaVerticalSearcher();
        
        const horizontalMatchCounter = horizontalSearcher.searchHorizontally(testDna);
        const verticalMatchCounter = verticalSearcher.searchVertically(testDna);
        const diagonalMatchCounter = diagonalSearcher.searchDiagonally(testDna);

        // console.log("Parent", horizontalMatchCounter, verticalMatchCounter, diagonalMatchCounter)
        let dnaMatchCounter = 0;
        dnaMatchCounter = horizontalMatchCounter + verticalMatchCounter + diagonalMatchCounter;
        if (dnaMatchCounter >= this.MATCH_DNA_SEQUENCE_TARGET) {
            return true;
        }
        return false;
    }
}
