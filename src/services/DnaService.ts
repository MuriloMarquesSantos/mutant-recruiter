export default class DnaService {
    isMutant(testDna: string[]): boolean {
        const joinDnaSequence = testDna.join('');
        return this.analyzeDnaHorizontally(joinDnaSequence);
    }

    private analyzeDnaHorizontally(joinDnaSequence: string): boolean {
        const MATCH_DNA_LETTER_TARGET = 3;
        const MATCH_DNA_SEQUENCE_TARGET = 2;
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;

        for (let index = 1; index < joinDnaSequence.length; index++) {
            const currentDnaLetter = joinDnaSequence[index];
            const previousDnaLetter = joinDnaSequence[index - 1];

            dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter); 
            
            if (dnaMatchLetterCounter === MATCH_DNA_LETTER_TARGET) {
                dnaSequenceMatchCounter++;
            }
            if (dnaSequenceMatchCounter === MATCH_DNA_SEQUENCE_TARGET) {
                return true;
            }
        }
        return false;
    }

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string, dnaMatchLetterCounter: number): number {
        if (currentDnaLetter === previousDnaLetter) {
            return dnaMatchLetterCounter + 1;
        }
        return 0;
    }
}