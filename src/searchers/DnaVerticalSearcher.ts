export default class DnaVerticalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;

    public searchVertically(testDna: string[]): number {
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

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string, dnaMatchLetterCounter: number): number {
        if (currentDnaLetter === previousDnaLetter) {
            return dnaMatchLetterCounter + 1;
        }
        return 0;
    }
}