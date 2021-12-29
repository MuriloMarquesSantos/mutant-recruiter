import DiagonalSearcher from "../searchers/DiagonalSearcher";

export default class DnaService {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    // TODO -> VALIDATE CUBES SMALLER THAN 4x4.. Impossible to have mutant DNA if they have that size
    isMutant(testDna: string[]): boolean {
        const diagonalSearcher = new DiagonalSearcher();
        let dnaMatchCounter = 0;
        const joinDnaSequence = testDna.join('');
        const horizontalMatchCounter = this.analyzeDnaHorizontally(testDna);
        const verticalMatchCounter = this.analyzeDnaVertically(testDna);
        const diagonalMatchCounter = diagonalSearcher.searchDiagonally(testDna);

        // console.log("Parent", horizontalMatchCounter, verticalMatchCounter, diagonalMatchCounter)

        dnaMatchCounter = horizontalMatchCounter + verticalMatchCounter + diagonalMatchCounter;
        if (dnaMatchCounter >= this.MATCH_DNA_SEQUENCE_TARGET) {
            return true;
        }
        return false;
    }

    private analyzeDnaHorizontally(testDna: string[]): number {
        const dnaSequenceRowLength = testDna[0].length;
        const joinDnaSequence = testDna.join('');
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;

        for (let index = 1; index < joinDnaSequence.length; index++) {
            
            const currentDnaLetter = joinDnaSequence[index];
            const previousDnaLetter = joinDnaSequence[index - 1];

            dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter);
            
            const isNewLine = index % dnaSequenceRowLength === 0;
            if (isNewLine) {
                dnaMatchLetterCounter = 0;
            }
            
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
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0; 

        for (let controlIndex = 0; controlIndex < dnaSequenceRowLength; controlIndex++) {
            for (let index = controlIndex + dnaSequenceRowLength, counter = 0; counter < dnaSequenceRowLength - 1; index+=dnaSequenceRowLength, counter++) {
                const currentDnaLetter = joinDnaSequence[index];
                const previousDnaLetter = joinDnaSequence[index - dnaSequenceRowLength]; 
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