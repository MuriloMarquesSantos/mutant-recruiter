export default class DiagonalSearcher {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    public searchDiagonally(testDna: string[]): number {
        const dnaSequenceRowLength = testDna[0].length;
        const joinDnaSequence = testDna.join('');
        let dnaMatchCounter = 0;
        
        const topLeftMatchCounter = this.analyzeDnaFromTopLeftToTopRight(joinDnaSequence, dnaSequenceRowLength);
        const topRightMatchCounter = this.analyzeDnaFromTopRightToTopLeft(joinDnaSequence, dnaSequenceRowLength);
        
        dnaMatchCounter = topLeftMatchCounter + topRightMatchCounter;

        console.log(topLeftMatchCounter, topRightMatchCounter);

        return dnaMatchCounter;
    }

    private analyzeDnaFromTopLeftToTopRight(joinDnaSequence: string, dnaSequenceRowLength: number): number {
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

    private analyzeDnaFromTopRightToTopLeft(joinDnaSequence: string, dnaSequenceRowLength: number): number {
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
    

    private retrieveDnaLetterMatch(currentDnaLetter: string, previousDnaLetter:string, dnaMatchLetterCounter: number): number {
        if (currentDnaLetter === previousDnaLetter) {
            return dnaMatchLetterCounter + 1;
        }
        return 0;
    }
}