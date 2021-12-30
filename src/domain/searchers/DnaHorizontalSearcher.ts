export default class DnaHorizontalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;

    public searchHorizontally(testDna: string[]): number {
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
}