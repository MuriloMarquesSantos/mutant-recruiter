import DnaService from '../src/services/DnaService';

describe('DnaService', () => [
    it('should detect a mutant given a valid DNA', () => {
        const testDna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        const dnaService = new DnaService();
        const isMutantDna = dnaService.isMutant(testDna);

        expect(isMutantDna).toBe(true);
    })
])