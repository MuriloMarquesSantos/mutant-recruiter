export default class DiagonalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    public searchDiagonally(testDna: string[]): number {
        const dnaSequenceRowLength = testDna[0].length;
        const joinDnaSequence = testDna.join('');
        let dnaMatchCounter = 0;
        
        const topLeftMatchCounter = this.analyzeDnaFromTopLeftToTopRight(joinDnaSequence, dnaSequenceRowLength);
        const topRightMatchCounter = this.analyzeDnaFromTopRightToTopLeft(joinDnaSequence, dnaSequenceRowLength);
        const sideRightMatchCounter = this.analyzeDnaFromSideRightToBottomRight(joinDnaSequence, dnaSequenceRowLength);
        const sideLeftMatchCounter = this.analyzeDnaFromSideLeftToBottomRight(joinDnaSequence, dnaSequenceRowLength);
        
        dnaMatchCounter = topLeftMatchCounter + topRightMatchCounter + sideRightMatchCounter + sideLeftMatchCounter;

        console.log(topLeftMatchCounter, topRightMatchCounter, sideRightMatchCounter, sideLeftMatchCounter);

        return dnaMatchCounter;
    }

    private analyzeDnaFromTopRightToTopLeft(joinDnaSequence: string, dnaSequenceRowLength: number): number {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;
        let diagonalPointer = -1;
        let didNotHitTheLeftEdge = true;
        
        //linha andando vertical começa em 3 e termina na última célula da linha
        for (let controlIndex = 3; controlIndex < dnaSequenceRowLength; controlIndex++) {
            for (let index = controlIndex + (dnaSequenceRowLength + diagonalPointer); didNotHitTheLeftEdge; index += (dnaSequenceRowLength + diagonalPointer)) {

                didNotHitTheLeftEdge = index % dnaSequenceRowLength !== 0;
                const currentDnaLetter = joinDnaSequence[index];
                const previousDnaLetter = joinDnaSequence[(index - dnaSequenceRowLength) - diagonalPointer];

                dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter);

                if (dnaMatchLetterCounter === this.MATCH_DNA_LETTER_TARGET) {
                    dnaSequenceMatchCounter++;
                    dnaMatchLetterCounter = 0;
                }
                if (dnaSequenceMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                    return this.MATCH_DNA_SEQUENCE_TARGET;
                }
            }
            
            didNotHitTheLeftEdge = true;
            dnaMatchLetterCounter = 0;
        }
        return dnaSequenceMatchCounter;
    }

    private analyzeDnaFromTopLeftToTopRight(joinDnaSequence: string, dnaSequenceRowLength: number): number {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;
        let diagonalPointer = +1;
        let didNotHitTheRightEdge = true;
        
        //linha andando vertical começa em length - 3 e termina na última célula da linha esquerda
        for (let controlIndex = dnaSequenceRowLength - 3; controlIndex >= 0; controlIndex--) {
            for (let index = controlIndex + (dnaSequenceRowLength + diagonalPointer); didNotHitTheRightEdge; index += (dnaSequenceRowLength + diagonalPointer)) {
                didNotHitTheRightEdge = index % dnaSequenceRowLength !== dnaSequenceRowLength - 1;
                const currentDnaLetter = joinDnaSequence[index];
                const previousDnaLetter = joinDnaSequence[(index - dnaSequenceRowLength) - diagonalPointer];

                dnaMatchLetterCounter = this.retrieveDnaLetterMatch(currentDnaLetter, previousDnaLetter, dnaMatchLetterCounter);

                if (dnaMatchLetterCounter === this.MATCH_DNA_LETTER_TARGET) {
                    dnaSequenceMatchCounter++;
                    dnaMatchLetterCounter = 0;
                }
                if (dnaSequenceMatchCounter === this.MATCH_DNA_SEQUENCE_TARGET) {
                    return this.MATCH_DNA_SEQUENCE_TARGET;
                }
            }
            
            didNotHitTheRightEdge = true;
            dnaMatchLetterCounter = 0;
        }
        return dnaSequenceMatchCounter;
    }

    private analyzeDnaFromSideRightToBottomRight(joinDnaSequence: string, dnaSequenceRowLength: number): number {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;
        let diagonalPointer = -1;
        const DNA_SIZE = dnaSequenceRowLength * dnaSequenceRowLength;
        const SEARCH_START = (dnaSequenceRowLength * 2) - 1;
        
        //a analisa começa em (length * 2) - 1, progride. Apenas o control index deveria mudar
        // A lógica de analise deveria ser igual ao TOPRIGHT
        for (let controlIndex = SEARCH_START; controlIndex < DNA_SIZE; controlIndex+=dnaSequenceRowLength) {
            for (let index = controlIndex + (dnaSequenceRowLength + diagonalPointer); joinDnaSequence[index] !== undefined; index += (dnaSequenceRowLength + diagonalPointer)) {

                const currentDnaLetter = joinDnaSequence[index];
                const previousDnaLetter = joinDnaSequence[(index - dnaSequenceRowLength) - diagonalPointer];

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

    private analyzeDnaFromSideLeftToBottomRight(joinDnaSequence: string, dnaSequenceRowLength: number): number {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;
        let diagonalPointer = +1;
        const DNA_SIZE = dnaSequenceRowLength * dnaSequenceRowLength;
        const SEARCH_LIMIT = (DNA_SIZE - dnaSequenceRowLength);
        const SEARCH_START = dnaSequenceRowLength;

        //linha andando vertical começa em length - 3 e termina na última célula da linha esquerda
        for (let controlIndex = SEARCH_START; controlIndex <= SEARCH_LIMIT; controlIndex+=dnaSequenceRowLength) {
            for (let index = controlIndex + (dnaSequenceRowLength + diagonalPointer); joinDnaSequence[index] !== undefined; index += (dnaSequenceRowLength + diagonalPointer)) {
                const currentDnaLetter = joinDnaSequence[index];
                const previousDnaLetter = joinDnaSequence[(index - dnaSequenceRowLength) - diagonalPointer];

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