import DnaDiagonalSearcher from '../../../src/domain/searchers/DnaDiagonalSearcher';

describe('DnaDiagonalSearcher', () => {
    let dnaSearcher: DnaDiagonalSearcher;
    it('should detect a mutant given a DNA that contains multiple top-left diagonal matches', () => {
        const testDna = ["ATTTTA","CAATGC","TTTGGT","ATGAGA","CGAATC","TCACTT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(2); 
    });

    it('should detect a mutant given a DNA that contains multiple top-right diagonal matches', () => {
        const testDna = ["ATTTAA","TAATGT","TCAGTT","ATGATA","CGCCTC","TCTCTT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(2); 
    });

    it('should detect a mutant given a DNA that contains multiple side-right diagonal matches', () => {
        const testDna = ["ATTTAA","CAATGC","TTTGCT","ATCCTA","CGCTTC","TCTCTT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(2);
    });

    it('should not detect a mutant given a DNA that contains only one side-right diagonal match', () => {
        const testDna = ["ATTTAA","CAATGC","TTTGCA","ATCCTA","CGCTTC","TCTCTT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(1);
    });

    it('should detect a mutant given a DNA that contains multiple side-left diagonal matches', () => {
        const testDna = ["ATTTAA","AAATGA","TCTGCT","ATCCAA","CGTCTC","TCTTCT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(2);
    });

    it('should not detect a mutant given a DNA that contains only one side-left diagonal match', () => {
        const testDna = ["ATTTAA","AAATGA","GCTGCT","ATCCAA","CGTCTC","TCTTCT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(1);
    });

    it('should not detect a mutant given a DNA that contains only one diagonal match', () => {
        const testDna = ["ATTTAA","CAATGC","TTCGGT","ATGAGA","CGAATC","TCACTT"];
        dnaSearcher = new DnaDiagonalSearcher(testDna);
        const dnaMatches = dnaSearcher.searchDiagonally();

        expect(dnaMatches).toBe(1);
    });
});
