export default class DnaService {
    isMutant(testDna: string[]): boolean {
        let dnaMatchLetterCounter = 0;
        let dnaSequenceMatchCounter = 0;
        const joinDnaSequence = testDna.join('');
        for (let index = 1; index < joinDnaSequence.length; index++) {
            if (joinDnaSequence[index] === joinDnaSequence[index - 1]) {
                dnaMatchLetterCounter++;
            } else {
                dnaMatchLetterCounter = 0;
            }
            if (dnaMatchLetterCounter === 3) {
                dnaSequenceMatchCounter++;
            }
            if (dnaSequenceMatchCounter === 2) {
                return true;
            }
        }
        return false;
    }
}