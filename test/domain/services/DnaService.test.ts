import DnaService from '../../../src/domain/services/DnaService';
import FakeDnaRepository from '../../../src/infra/database/repositories/fakes/FakeDnaRepository';
import IDnaRepository from '../../../src/infra/database/repositories/IDnaRepository';

describe('DnaService', () => {
    let fakeDnaRepository: IDnaRepository;
    let dnaService: DnaService;
    beforeEach(() => {
        fakeDnaRepository = new FakeDnaRepository();
        dnaService = new DnaService(fakeDnaRepository);
    })
    it('should return true given a valid DNA', async () => {
        const save = jest.spyOn(fakeDnaRepository, 'save');
        const testDna = ["ATGCGA","CAATGC","TTATGT","AGACGA","CCAATC","TCACTT"];
        const isMutantResponse = await dnaService.isMutant(testDna);

        expect(isMutantResponse.isMutant).toBe(true); 
        expect(save).toHaveBeenCalledTimes(1);
    });

    it('should return false given an invalid DNA', async () => {
        const save = jest.spyOn(fakeDnaRepository, 'save');
        const testDna = ["ATGCAA","CAGTGC","TTATGT","AGACGA","CCAATC","TCTCTT"];
        const isMutantResponse = await dnaService.isMutant(testDna);

        expect(isMutantResponse.isMutant).toBe(false); 
        expect(save).toHaveBeenCalledTimes(1);
    });

    it('should detect a mutant given a DNA that contain one diagonal and one vertical match', async () => {
        const save = jest.spyOn(fakeDnaRepository, 'save');
        const testDna = ["ATTTAA","CAATGC","TTATGT","AGAAGA","CCTAGC","TCACTT"];
        const isMutantResponse = await dnaService.isMutant(testDna);

        expect(isMutantResponse.isMutant).toBe(true); 
        expect(save).toHaveBeenCalledTimes(1);
    });

    it('should detect a mutant given a DNA that contains matches in all three dimensions', async () => {
        const save = jest.spyOn(fakeDnaRepository, 'save');
        const testDna = ["TTTTAT","CTATAC","TTAAGT","ATAAGA","CCTAGC","TCACTT"];
        const isMutantResponse = await dnaService.isMutant(testDna);

        expect(isMutantResponse.isMutant).toBe(true); 
        expect(save).toHaveBeenCalledTimes(1);
    });
});