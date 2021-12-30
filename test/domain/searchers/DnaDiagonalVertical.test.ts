import DnaVerticalSearcher from '../../../src/domain/searchers/DnaVerticalSearcher';

describe('DnaDiagonalSearcher', () => {
    let dnaSearcher: DnaVerticalSearcher;
    beforeEach(() => {
        dnaSearcher = new DnaVerticalSearcher();
    });

    it('should detect a mutant given a DNA that contains multiple vertical matches', () => {
        const testDna = ["ATGCGA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"]
        const dnaMatches = dnaSearcher.searchVertically(testDna);

        expect(dnaMatches).toBe(2); 
    });

    it('should not detect a mutant given a DNA that contains only one vertical match', () => {
        const testDna = ["ATGCTA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
        const dnaMatches = dnaSearcher.searchVertically(testDna);

        expect(dnaMatches).toBe(1);
    }); 
});