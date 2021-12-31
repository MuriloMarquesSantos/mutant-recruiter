import DnaSearchCounter from "./DnaSearchCounter";

export default class DnaVerticalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    private joinDnaSequence: string;
    private dnaSearchCounter: DnaSearchCounter;
    private dnaSequenceRowLength: number;

    constructor(testDna: string[]) {
        this.joinDnaSequence = testDna.join('');
        this.dnaSearchCounter = new DnaSearchCounter();
        this.dnaSequenceRowLength = testDna[0].length;
    }
    
    public searchVertically(): number {
        for (let controlIndex = 0; controlIndex < this.dnaSequenceRowLength; controlIndex++) {
            const columnResult = this.analyzeEachColumnLetter(controlIndex);
            if (columnResult !== 0) return columnResult;
            this.dnaSearchCounter.dnaLetterMatchCounter = 0;
        }
        return this.dnaSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachColumnLetter(controlIndex: number): number {
        for (let index = controlIndex + this.dnaSequenceRowLength, counter = 0; counter < this.dnaSequenceRowLength - 1; index+=this.dnaSequenceRowLength, counter++) {
            const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[index - this.dnaSequenceRowLength]; 
            this.dnaSearchCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter); 

            this.dnaSearchCounter = this.evaluateIsLineMatch(); 
            if (this.dnaSearchCounter.dnaLineMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                return this.MATCH_DNA_SEQUENCE_TARGET;
            }  
        }
        return 0;
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