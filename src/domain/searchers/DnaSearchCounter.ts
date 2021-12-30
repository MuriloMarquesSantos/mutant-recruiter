export default class DnaSearchCounter {
    dnaLetterMatchCounter: number;
    dnaLineMatchCounter: number;
    constructor() {
        this.dnaLetterMatchCounter = 0;
        this.dnaLineMatchCounter = 0;
    }

    copy(): DnaSearchCounter {
        const copySearchCounter = new DnaSearchCounter();
        copySearchCounter.dnaLetterMatchCounter = this.dnaLetterMatchCounter;
        copySearchCounter.dnaLineMatchCounter = this.dnaLineMatchCounter;

        return copySearchCounter;
    }
}
