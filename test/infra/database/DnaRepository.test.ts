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

    // it('should return isMutant false with 403 code given valid request', (done) => {
    //     ((DnaService as jest.Mock<DnaService>) as any).mockImplementationOnce(() => {
    //         return {
    //             isMutant: () => {
    //                 return {isMutant: false};
    //             }
    //         }
    //     });
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: ["AGGCAA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(403)
    //         .then(response => {
    //             expect(response.body).toEqual({isMutant: false});
    //             done();
    //         })
    //         .catch(error => done(error));     
    // });

    // it('should return error message false with 400 code given dna with different lengths', (done) => {  
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: ["AGGCA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(400)
    //         .then(response => {
    //             expect(response.body).toEqual({message: "All words must have the same length", status: "error"});
    //             done();
    //         })
    //         .catch(error => done(error));     
    // });

    // it('should return error message with 400 code given dna is empty', (done) => {  
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: [],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(400)
    //         .then(response => {
    //             expect(response.body).toEqual({message: "Dna is mandatory", status: "error"});
    //             done();
    //         })
    //         .catch(error => done(error));     
    // });

    // it('should return error message with 400 code given dna has invalid length', (done) => {  
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: ["AGG", "CAG", "TCA", "AGG", "CGA", "TTA"],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(400)
    //         .then(response => {
    //             expect(response.body).toEqual({message: "A Dna 'Word' must have at least 4 words", status: "error"});
    //             done();
    //         })
    //         .catch(error => done(error));     
    // });

    // it('should return code 500 given an error in the service', (done) => {
    //     ((DnaService as jest.Mock<DnaService>) as any).mockImplementationOnce(() => {
    //         return {
    //             isMutant: () => {
    //                 throw new Error("Internal server error");
    //             }
    //         }
    //     });
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: ["AGGCAA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(500)
    //         .then(response => {
    //             expect(response.body).toEqual({message: "Internal server error"});
    //             done();
    //         })
    //         .catch(error => done(error)); 
    // });

    // it('should return code 400 given dna contains forbidden letters', (done) => {
    //     request(app)
    //         .post('/mutant/')
    //         .send({
    //             dna: ["AGGCAA", "CAGXCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(400)
    //         .then(response => {
    //             expect(response.body).toEqual({message: "Dna should be composed by A,C,G and T", status: "error"});
    //             done();
    //         })
    //         .catch(error => done(error)); 
    // });
});
