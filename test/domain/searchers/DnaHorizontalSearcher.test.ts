import DnaHorizontalSearcher from '../../../src/domain/searchers/DnaHorizontalSearcher';

describe('DnaHorizontalSearcher', () => {
    let dnaSearcher: DnaHorizontalSearcher;

    it('should detect a mutant given a DNA that contains multiple horizontal matches', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        dnaSearcher = new DnaHorizontalSearcher(testDna);
        const isMutantDna = dnaSearcher.searchHorizontally();

        expect(isMutantDna).toBe(2);
    });

    it('should not detect a mutant given a DNA that contains only one horizontal match', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
        dnaSearcher = new DnaHorizontalSearcher(testDna);
        const isMutantDna = dnaSearcher.searchHorizontally();

        expect(isMutantDna).toBe(1); 
    });
    
})