import DnaService from '../src/domain/services/DnaService';

describe('DnaService', () => {
    it('should detect a mutant given a DNA that contains multiple horizontal matches', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true);
    });

    it('should not detect a mutant given a DNA that contains only one horizontal match', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false); 
    });

    it('should not detect a mutant given a DNA that does not contain any valid match', () => {
        const testDna = ["CTTAA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false); 
    });

    it('should detect a mutant given a DNA that contains multiple vertical matches', () => {
        const testDna = ["ATGCGA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"]
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true); 
    });

    it('should not detect a mutant given a DNA that contains only one vertical match', () => {
        const testDna = ["ATGCTA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false); 
    });

    it('should detect a mutant given a DNA that contains one vertical and one horizontal match', () => {
        const testDna = ["ATTTTA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true); 
    });

    it('should detect a mutant given a DNA that contains multiple top-left diagonal matches', () => {
        const testDna = ["ATTTTA","CAATGC","TTTGGT","ATGAGA","CGAATC","TCACTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true); 
    });

    it('should detect a mutant given a DNA that contains multiple top-right diagonal matches', () => {
        const testDna = ["ATTTAA","TAATGT","TCAGTT","ATCATA","CGCCTC","TCTCTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true); 
    });

    it('should detect a mutant given a DNA that contains multiple side-right diagonal matches', () => {
        const testDna = ["ATTTAA","CAATGC","TTTGCT","ATCCTA","CGCTTC","TCTCTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true);
    });

    it('should not detect a mutant given a DNA that contains only one side-right diagonal match', () => {
        const testDna = ["ATTTAA","CAATGC","TTTGCA","ATCCTA","CGCTTC","TCTCTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false);
    });

    it('should detect a mutant given a DNA that contains multiple side-left diagonal matches', () => {
        const testDna = ["ATTTAA","AAATGA","TCTGCT","ATCCAA","CGTCTC","TCTTCT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true);
    });

    it('should not detect a mutant given a DNA that contains only one side-left diagonal match', () => {
        const testDna = ["ATTTAA","AAATGA","GCTGCT","ATCCAA","CGTCTC","TCTTCT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false);
    });

    it('should not detect a mutant given a DNA that contains only one diagonal match', () => {
        const testDna = ["ATTTAA","CAATGC","TTCGGT","ATGAGA","CGAATC","TCACTT"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false);
    });

    it.todo('should detect a mutant given a DNA that contain one diagonal and one vertical match');

    it.todo('should detect a mutant given a DNA that contain one diagonal and one horizontal match');

    it.todo('should detect a mutant given a DNA that contains matches in all three dimensions');
});