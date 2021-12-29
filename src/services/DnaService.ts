import DiagonalSearcher from "../searchers/DiagonalSearcher";

export default class DnaService {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    // TODO -> VALIDATE CUBES SMALLER THAN 4x4.. Impossible to have mutant DNA if they have that size
    isMutant(testDna: string[]): boolean {
        const diagonalSearcher = new DiagonalSearcher();
        let dnaMatchCounter = 0;
        const joinDnaSequence = testDna.join('');
        const horizontalMatchCounter = this.analyzeDnaHorizontally(joinDnaSequence);
        const verticalMatchCounter = this.analyzeDnaVertically(testDna);
        const diagonalMatchCounter = diagonalSearcher.searchDiagonally(testDna);

        dnaMatchCounter = horizontalMatchCounter + verticalMatchCounter + diagonalMatchCounter;
        if (dnaMatchCounter >= this.MATCH_DNA_SEQUENCE_TARGET) {
            return true;
        }
        return false;
    }

    private analyzeDnaHorizontally(joinDnaSequence: string): number {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;

        for (let index = 1; index < joinDnaSequence.length; index++) {
            const currentDnaLetter = joinDnaSequence[index];
            const previousDnaLetter = joinDnaSequence[index - 1];

            dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter); 
            
            if (dnaMatchLetterCounter === this.MATCH_DNA_LETTER_TARGET) {
                dnaSequenceMatchCounter++;
                dnaMatchLetterCounter = 0;
            }
            if (dnaSequenceMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                return this.MATCH_DNA_SEQUENCE_TARGET;
            }
        }
        return dnaSequenceMatchCounter;
    }

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string, dnaMatchLetterCounter: number): number {
        if (currentDnaLetter === previousDnaLetter) {
            return dnaMatchLetterCounter + 1;
        }
        return 0;
    }

    private analyzeDnaVertically(testDna: string[]): number {
        const dnaSequenceRowLength = testDna[0].length;
        const joinDnaSequence = testDna.join('');
        const dnaSequenceDepth = (dnaSequenceRowLength * dnaSequenceRowLength);
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0; 

        for (let index = 0; index < dnaSequenceRowLength; index++) {
            for (let index2 = index + dnaSequenceRowLength; index2 <= dnaSequenceDepth + index; index2+=dnaSequenceRowLength) {
                const currentDnaLetter = joinDnaSequence[index2];
                const previousDnaLetter = joinDnaSequence[index2 - dnaSequenceRowLength]; 

                dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter); 

                if (dnaMatchLetterCounter === this.MATCH_DNA_LETTER_TARGET) {
                    dnaSequenceMatchCounter++;
                    dnaMatchLetterCounter = 0;
                }
                if (dnaSequenceMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                    return this.MATCH_DNA_SEQUENCE_TARGET;
                }
            }
            dnaMatchLetterCounter = 0;
        }
        return dnaSequenceMatchCounter;
    }

    
}