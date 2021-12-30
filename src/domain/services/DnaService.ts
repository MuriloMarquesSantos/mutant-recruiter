import { inject, injectable } from "tsyringe";
import IDnaRepository from "../../infra/database/repositories/IDnaRepository";
import DnaResponse from "../dtos/DnaResponse";
import DnaDiagonalSearcher from "../searchers/DnaDiagonalSearcher";
import DnaHorizontalSearcher from "../searchers/DnaHorizontalSearcher";
import DnaVerticalSearcher from "../searchers/DnaVerticalSearcher";

@injectable()
export default class DnaService {
    MATCH_DNA_SEQUENCE_TARGET = 2;
    MATCH_DNA_LETTER_TARGET = 3;
    private dnaRepository: IDnaRepository;
    constructor(
        @inject('DnaRepository')
        dnaRepository: IDnaRepository,
    ) {
        this.dnaRepository = dnaRepository;    
    }

    async isMutant(testDna: string[]): Promise<DnaResponse> {
        const joinTestDna = testDna.join('');

        const dnaAnalysisResponse = await this.analyzeDna(testDna);
        
        await this.dnaRepository.save({
            dna: joinTestDna,
            isMutant: dnaAnalysisResponse,
        });

        return {
            isMutant: dnaAnalysisResponse
        }
    }

    private async analyzeDna(testDna: string[]): Promise<boolean> {
        const diagonalSearcher = new DnaDiagonalSearcher(testDna);
        const horizontalSearcher = new DnaHorizontalSearcher(testDna);
        const verticalSearcher = new DnaVerticalSearcher(testDna);
        
        const horizontalMatchCounter = horizontalSearcher.searchHorizontally();
        const verticalMatchCounter = verticalSearcher.searchVertically();
        const diagonalMatchCounter = diagonalSearcher.searchDiagonally();

        let dnaMatchCounter = 0;
        dnaMatchCounter = horizontalMatchCounter + verticalMatchCounter + diagonalMatchCounter;
        if (dnaMatchCounter >= this.MATCH_DNA_SEQUENCE_TARGET) {
            return true;
        }
        return false;
    }
}
