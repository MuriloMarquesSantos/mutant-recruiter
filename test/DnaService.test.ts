import DnaService from '../src/services/DnaService';

describe('DnaService', () => {
    it('should detect a mutant given a DNA that contains multiple horizontal sequences', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true);
    });

    it('should not detect a mutant given a DNA that contains only one horizontal sequence', () => {
        const testDna = ["CTTTTA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(false); 
    })
});