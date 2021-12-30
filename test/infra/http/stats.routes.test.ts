import request from  'supertest';
jest.mock('../../../src/domain/services/StatsService')

import app from '../../../src/infra/http/routes';
import StatsService from '../../../src/domain/services/StatsService';
import AppError from '../../../src/shared/errors/AppError';

describe("Stats Routes", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return correct stats given service request succeeded', (done) => {
        ((StatsService as jest.Mock<StatsService>) as any).mockImplementationOnce(() => {
            return {
                getDnaStats: () => {
                    return {
                        count_mutant_dna: 5,
                        count_human_dna: 10,
                        ratio: 0.5,
                    };
                }
            }
        });
        request(app)
            .get('/stats/')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    count_mutant_dna: 5,
                    count_human_dna: 10,
                    ratio: 0.5,
                });
                done();
            })
            .catch(error => done(error));     
    });

    it('should return code 500 given service request returned with error', (done) => {
        ((StatsService as jest.Mock<StatsService>) as any).mockImplementationOnce(() => {
            return {
                getDnaStats: () => {
                    throw new AppError("Internal Server Error", 500);
                }
            }
        });
        request(app)
            .get('/stats/')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toEqual({message: "Internal Server Error"});
                done();
            })
            .catch(error => done(error));     
    });
});
