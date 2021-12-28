import DnaService from '../src/services/DnaService';

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
        const testDna = ["ATGCGA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
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
});