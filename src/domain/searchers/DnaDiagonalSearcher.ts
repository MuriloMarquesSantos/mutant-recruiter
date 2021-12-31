import DnaSearchCounter from "./DnaSearchCounter";

export default class DiagonalSearcher {
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

    public searchDiagonally(): number {
        const topLeftMatchCounter = this.analyzeDnaFromTopLeftToTopRight();
        const topRightMatchCounter = this.analyzeDnaFromTopRightToTopLeft();
        const sideRightMatchCounter = this.analyzeDnaFromSideRightToBottomRight();
        const sideLeftMatchCounter = this.analyzeDnaFromSideLeftToBottomRight();
        
        this.dnaSearchCounter.dnaLineMatchCounter = topLeftMatchCounter + topRightMatchCounter + sideRightMatchCounter + sideLeftMatchCounter;

        return this.dnaSearchCounter.dnaLineMatchCounter;
    }

    private analyzeDnaFromTopRightToTopLeft(): number {
        const localSearchCounter = new DnaSearchCounter();
        const SEARCH_BEGIN_INDEX = 3;
        let didNotHitTheLeftEdge = true;
        for (let controlIndex = SEARCH_BEGIN_INDEX; controlIndex < this.dnaSequenceRowLength; controlIndex++) {
            const topRightDiagonalResult = this.analyzeEachTopRightDiagonal(controlIndex, didNotHitTheLeftEdge, localSearchCounter);
            if (topRightDiagonalResult !== 0) return topRightDiagonalResult;
            
            didNotHitTheLeftEdge = true;
            localSearchCounter.dnaLetterMatchCounter = 0;
        }
        return localSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachTopRightDiagonal(controlIndex: number, didNotHitTheLeftEdge: boolean, localSearchCounter: DnaSearchCounter): number {
        let diagonalPointer = -1;
        for (let index = controlIndex + (this.dnaSequenceRowLength + diagonalPointer); didNotHitTheLeftEdge; index += (this.dnaSequenceRowLength + diagonalPointer)) {
            didNotHitTheLeftEdge = index % this.dnaSequenceRowLength !== 0;
            const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[(index - this.dnaSequenceRowLength) - diagonalPointer];

            const seekDnaMatchResult = this.seekForDnaMatch(currentDnaLetter, previousDnaLetter, localSearchCounter);
            if (seekDnaMatchResult !== 0) return seekDnaMatchResult;
        }
        return 0;
    }

    private analyzeDnaFromTopLeftToTopRight(): number {
        const localSearchCounter = new DnaSearchCounter();
        let didNotHitTheRightEdge = true;
        const SEARCH_BEGIN_INDEX = this.dnaSequenceRowLength - 3;
        for (let controlIndex = SEARCH_BEGIN_INDEX; controlIndex >= 0; controlIndex--) {
            const topLeftDiagonalResult = this.analyzeEachTopLeftDiagonal(controlIndex, didNotHitTheRightEdge, localSearchCounter);
            if (topLeftDiagonalResult !== 0) return topLeftDiagonalResult;

            didNotHitTheRightEdge = true;
            localSearchCounter.dnaLetterMatchCounter = 0;
        }
        return localSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachTopLeftDiagonal(controlIndex: number, didNotHitTheRightEdge: boolean, localSearchCounter: DnaSearchCounter) {
        let diagonalPointer = +1;
        const SEARCH_BEGIN_INDEX = controlIndex + (this.dnaSequenceRowLength + diagonalPointer);
        for (let index = SEARCH_BEGIN_INDEX; didNotHitTheRightEdge; index += (this.dnaSequenceRowLength + diagonalPointer)) {
            didNotHitTheRightEdge = index % this.dnaSequenceRowLength !== this.dnaSequenceRowLength - 1;
            const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[(index - this.dnaSequenceRowLength) - diagonalPointer];

            const seekDnaMatchResult = this.seekForDnaMatch(currentDnaLetter, previousDnaLetter, localSearchCounter);
            if (seekDnaMatchResult !== 0) return seekDnaMatchResult;
        }
        return 0;
    }

    private analyzeDnaFromSideRightToBottomRight(): number {
        const localSearchCounter = new DnaSearchCounter();
        const DNA_SIZE = this.dnaSequenceRowLength * this.dnaSequenceRowLength;
        const SEARCH_BEGIN_INDEX = (this.dnaSequenceRowLength * 2) - 1;

        for (let controlIndex = SEARCH_BEGIN_INDEX; controlIndex < DNA_SIZE; controlIndex+=this.dnaSequenceRowLength) {
            const sideRightDiagonalResult = this.analyzeEachSideRightDiagonal(controlIndex, localSearchCounter);
            if (sideRightDiagonalResult !== 0) return sideRightDiagonalResult;

            localSearchCounter.dnaLetterMatchCounter = 0;
        }
        return localSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachSideRightDiagonal(controlIndex: number, localSearchCounter: DnaSearchCounter): number {
        let diagonalPointer = -1;
        for (let index = controlIndex + (this.dnaSequenceRowLength + diagonalPointer); this.joinDnaSequence[index] !== undefined; index += (this.dnaSequenceRowLength + diagonalPointer)) {
            const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[(index - this.dnaSequenceRowLength) - diagonalPointer];
            const seekDnaMatchResult = this.seekForDnaMatch(currentDnaLetter, previousDnaLetter, localSearchCounter);

            if (seekDnaMatchResult !== 0) return seekDnaMatchResult;
        }
        return 0;
    }

    private analyzeDnaFromSideLeftToBottomRight(): number {
        const localSearchCounter = new DnaSearchCounter();
        const DNA_SIZE = this.dnaSequenceRowLength * this.dnaSequenceRowLength;
        const SEARCH_LIMIT = (DNA_SIZE - this.dnaSequenceRowLength);
        const SEARCH_BEGIN_INDEX = this.dnaSequenceRowLength;

        for (let controlIndex = SEARCH_BEGIN_INDEX; controlIndex <= SEARCH_LIMIT; controlIndex+=this.dnaSequenceRowLength) {
            const sideLeftDiagonalResult = this.analyzeEachSideLeftDiagonal(controlIndex, localSearchCounter);
            if (sideLeftDiagonalResult !== 0) return sideLeftDiagonalResult;

            localSearchCounter.dnaLetterMatchCounter = 0;
        }
        return localSearchCounter.dnaLineMatchCounter;
    }

    private analyzeEachSideLeftDiagonal(controlIndex: number, localSearchCounter: DnaSearchCounter) {
        let diagonalPointer = +1;
        for (let index = controlIndex + (this.dnaSequenceRowLength + diagonalPointer); this.joinDnaSequence[index] !== undefined; index += (this.dnaSequenceRowLength + diagonalPointer)) {
            const currentDnaLetter = this.joinDnaSequence[index];
            const previousDnaLetter = this.joinDnaSequence[(index - this.dnaSequenceRowLength) - diagonalPointer];

            const seekDnaMatchResult = this.seekForDnaMatch(currentDnaLetter, previousDnaLetter, localSearchCounter);
            if (seekDnaMatchResult !== 0) return seekDnaMatchResult;
        }
        return 0;
    }

    private seekForDnaMatch(currentDnaLetter: string, previousDnaLetter: string, localSearchCounter: DnaSearchCounter): number {
        localSearchCounter.dnaLetterMatchCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, localSearchCounter.dnaLetterMatchCounter);
    
        const updatedCounter = this.evaluateIsLineMatch(localSearchCounter);
        if (updatedCounter.dnaLineMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
            return this.MATCH_DNA_SEQUENCE_TARGET;
        }
        return 0;
    }
    

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string, dnaMatchLetterCounter: number): number {
        if (currentDnaLetter === previousDnaLetter) {
            return dnaMatchLetterCounter + 1;
        }
        return 0;
    }

    private evaluateIsLineMatch(localSearchCounter: DnaSearchCounter): DnaSearchCounter {
        if (localSearchCounter.dnaLetterMatchCounter === this.MATCH_DNA_LETTER_TARGET) {
            localSearchCounter.dnaLineMatchCounter++;
            localSearchCounter.dnaLetterMatchCounter = 0;
        }

        return localSearchCounter;
    }
}
