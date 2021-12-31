import DnaVerticalSearcher from '../../../src/domain/searchers/DnaVerticalSearcher';

describe('DnaVerticalSearcher', () => {
    let dnaSearcher: DnaVerticalSearcher;

    it('should detect a mutant given a DNA that contains multiple vertical matches', () => {
        const testDna = ["ATGCGA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"]
        dnaSearcher = new DnaVerticalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchVertically();
        
        expect(dnaMatches).toBe(2); 
    });

    it('should not detect a mutant given a DNA that contains only one vertical match', () => {
        const testDna = ["ATGCTA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
        dnaSearcher = new DnaVerticalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchVertically();

        expect(dnaMatches).toBe(1);
    }); 
});
