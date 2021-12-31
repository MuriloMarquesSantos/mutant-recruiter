import DnaModel from '../../../src/infra/database/models/Dna';
jest.mock('../../../src/domain/services/DnaService')

import DnaRepository from '../../../src/infra/database/repositories/DnaRepository';
import AppError from '../../../src/shared/errors/AppError';

describe("Dna Repository", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return valid saved dna given db saved with success', async () => {
        const dnaRepository = new DnaRepository();
        const dnaSample = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true
        }
        const createFunction = jest.spyOn(DnaModel, 'create');
        createFunction.mockImplementationOnce(() => {
            return dnaSample;
        });

        const savedDna = await dnaRepository.save(dnaSample);
        
        expect(savedDna).toBeTruthy();
        expect(savedDna.isMutant).toBe(true);
    });

    it('should catch error given db threw error', async () => {
        const dnaRepository = new DnaRepository();
        const dnaSample = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true
        }
        const createFunction = jest.spyOn(DnaModel, 'create');
        createFunction.mockImplementationOnce(() => {
            throw new Error("Db Error");
        });

        await expect(dnaRepository.save(dnaSample)).rejects
            .toEqual(new AppError("Persistence Error", 500));
    });

    it('should catch error given db threw error', async () => {
        const dnaRepository = new DnaRepository();
        const dnaSample = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true
        }
        const countFunction = jest.spyOn(DnaModel, 'aggregate' as any);
        countFunction.mockReturnValue(
            [
                {_id: true, count: 2},
                {_id: false, count: 4},  
            ]
        );

        const dnaCountResponse = await dnaRepository.getCountByIsMutant();
        expect(dnaCountResponse.count_human_dna).toBe(4);
        expect(dnaCountResponse.count_mutant_dna).toBe(2);
        expect(dnaCountResponse.ratio).toBe(0.5);
    });

    it('should catch error given db threw error on dna count', async () => {
        const dnaRepository = new DnaRepository();
        const dnaSample = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true
        }
        const countFunction = jest.spyOn(DnaModel, 'aggregate' as any);
        countFunction.mockImplementationOnce(() => {
            throw new Error("Db Error");
        });

        await expect(dnaRepository.getCountByIsMutant()).rejects
            .toEqual(new AppError("Persistence Error", 500));
    });

    it('should return empty object given there are no dna in the DB', async () => {
        const dnaRepository = new DnaRepository();
        const dnaSample = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true
        }
        const countFunction = jest.spyOn(DnaModel, 'aggregate' as any);
        countFunction.mockImplementationOnce(() => {
            return [];
        });

        const dnaCountResponse = await dnaRepository.getCountByIsMutant();
        expect(dnaCountResponse.count_human_dna).toBe(0);
        expect(dnaCountResponse.count_mutant_dna).toBe(0);
        expect(dnaCountResponse.ratio).toBe(0);
    });
});
