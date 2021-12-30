import DnaSearchCounter from "./DnaSearchCounter";

export default class DnaHorizontalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;

    private joinDnaSequence: string;
    private dnaSearchCounter: DnaSearchCounter;
    private dnaSequenceRowLength: number;

    constructor(testDna: string[]) {
        this.joinDnaSequence = testDna.join('');
        this.dnaSearchCounter = new DnaSearchCounter
        this.dnaSequenceRowLength = testDna[0].length;
    }

    public searchHorizontally(): number {
        for (let index = 1; index < this.joinDnaSequence.length; index++) {
            this.analyzeEachRowLetter(index);

            if (this.dnaSearchCounter.dnaLineMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                return this.MATCH_DNA_SEQUENCE_TARGET;
            }
        }
        return this.dnaSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachRowLetter(index: number) {
        const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[index - 1];

            this.dnaSearchCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter);
            
            this.evaluateIsNewLine(index);
            
            this.dnaSearchCounter = this.evaluateIsLineMatch();
    }

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string): DnaSearchCounter {
        const copyDnaSearchCounter = this.dnaSearchCounter.copy();
        if (currentDnaLetter === previousDnaLetter) {
            copyDnaSearchCounter.dnaLetterMatchCounter+=1;
            return copyDnaSearchCounter;
        }
        copyDnaSearchCounter.dnaLetterMatchCounter=0;
        return copyDnaSearchCounter;
    }

    private evaluateIsNewLine(index: number) {
        const isNewLine = index % this.dnaSequenceRowLength === 0;
        if (isNewLine) {
            this.dnaSearchCounter.dnaLetterMatchCounter = 0;
        }
    }

    private evaluateIsLineMatch(): DnaSearchCounter {
        if (this.dnaSearchCounter.dnaLetterMatchCounter === this.MATCH_DNA_LETTER_TARGET) {
            const dnaSearchCounterCopy = this.dnaSearchCounter.copy();
            dnaSearchCounterCopy.dnaLineMatchCounter+=1;
            dnaSearchCounterCopy.dnaLetterMatchCounter=0;

            return dnaSearchCounterCopy;
        }
        return this.dnaSearchCounter;
    }
}