import DnaRequest from "../../../src/domain/dtos/DnaRequest";
import StatsService from "../../../src/domain/services/StatsService";
import FakeDnaRepository from "../../../src/infra/database/repositories/fakes/FakeDnaRepository";
import AppError from '../../../src/shared/errors/AppError';

describe("Stats Service", () => {
    it("should retrieve stats correctly", () => {
        const fakeDnaRepository = new FakeDnaRepository();
        const statsService = new StatsService(fakeDnaRepository);

        const dnaRequest: DnaRequest = {
            dna: "AGGCAACAGCCGTCACTGAGAATACGAATGTTACAT",
            isMutant: true,
        }

        fakeDnaRepository.save(dnaRequest);

        expect(statsService.getDnaStats()).toBeTruthy();
    });
});
