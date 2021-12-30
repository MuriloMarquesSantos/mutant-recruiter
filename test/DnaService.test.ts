import DnaService from '../src/domain/services/DnaService';

xdescribe('DnaService', () => {

    // it('should not detect a mutant given a DNA that does not contain any valid match', () => {
    //     const testDna = ["CTTAA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"];
    //     const dnaService = new DnaService();
    //     const isMutantDna = dnaService.isMutant(testDna);

    //     expect(isMutantDna).toBe(false); 
    // });

    it.todo('should detect a mutant given a DNA that contain one diagonal and one vertical match');

    it.todo('should detect a mutant given a DNA that contain one diagonal and one horizontal match');

    it.todo('should detect a mutant given a DNA that contains matches in all three dimensions');
});