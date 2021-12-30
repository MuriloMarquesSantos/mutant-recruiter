import DnaHorizontalSearcher from '../../../src/domain/searchers/DnaHorizontalSearcher';

describe('DnaHorizontalSearcher', () => {
    let dnaSearcher: DnaHorizontalSearcher;
    beforeEach(() => {
        dnaSearcher = new DnaHorizontalSearcher();
    });

    it('should detect a mutant given a DNA that contains multiple horizontal matches', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        const isMutantDna = dnaSearcher.searchHorizontally(testDna);

        expect(isMutantDna).toBe(2);
    });

    it('should not detect a mutant given a DNA that contains only one horizontal match', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
        const isMutantDna = dnaSearcher.searchHorizontally(testDna);

        expect(isMutantDna).toBe(1); 
    });
    
})