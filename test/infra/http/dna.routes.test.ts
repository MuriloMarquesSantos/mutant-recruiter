import DnaService from '../../../src/domain/services/DnaService';
import request from  'supertest';
jest.mock('../../../src/domain/services/DnaService')

import app from '../../../src/infra/http/routes';

describe("Dna Routes", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return isMutant true with 200 code given valid request', (done) => {
        ((DnaService as jest.Mock<DnaService>) as any).mockImplementationOnce(() => {
            return {
                isMutant: () => {
                    return {isMutant: true};
                }
            }
        });
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGGCAA", "CAGCCG", "TCACTG", "AGAATA", "CGAATG", "TTACAT"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({isMutant: true});
                done();
            })
            .catch(error => done(error));     
    });

    it('should return isMutant false with 403 code given valid request', (done) => {
        ((DnaService as jest.Mock<DnaService>) as any).mockImplementationOnce(() => {
            return {
                isMutant: () => {
                    return {isMutant: false};
                }
            }
        });
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGGCAA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .then(response => {
                expect(response.body).toEqual({isMutant: false});
                done();
            })
            .catch(error => done(error));     
    });

    it('should return error message false with 400 code given dna with different lengths', (done) => {  
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGGCA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual({message: "All words must have the same length", status: "error"});
                done();
            })
            .catch(error => done(error));     
    });

    it('should return error message with 400 code given dna is empty', (done) => {  
        request(app)
            .post('/mutant/')
            .send({
                dna: [],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual({message: "Dna is mandatory", status: "error"});
                done();
            })
            .catch(error => done(error));     
    });

    it('should return error message with 400 code given dna has invalid length', (done) => {  
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGG", "CAG", "TCA", "AGG", "CGA", "TTA"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual({message: "A Dna 'Word' must have at least 4 words", status: "error"});
                done();
            })
            .catch(error => done(error));     
    });

    it('should return code 500 given an error in the service', (done) => {
        ((DnaService as jest.Mock<DnaService>) as any).mockImplementationOnce(() => {
            return {
                isMutant: () => {
                    throw new Error("Internal server error");
                }
            }
        });
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGGCAA", "CAGCCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toEqual({message: "Internal server error"});
                done();
            })
            .catch(error => done(error)); 
    });

    it('should return code 400 given dna contains forbidden letters', (done) => {
        request(app)
            .post('/mutant/')
            .send({
                dna: ["AGGCAA", "CAGXCG", "TCACTT", "AGGATA", "CGACTG", "TTACAT"],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual({message: "Dna should be composed by A,C,G and T", status: "error"});
                done();
            })
            .catch(error => done(error)); 
    });
});
