import { Request, Response, NextFunction } from 'express';
import AppError from '../../../shared/errors/AppError';

export default function validateRequest(
    request: Request,
    response: Response,
    next: NextFunction): void {
    
    const { dna } = request.body;

    validateIsEmpty(dna);

    const joinDna = dna.join("");
    validateDnaContent(joinDna);
    validateDnaLength(dna);

    next();
}

function validateIsEmpty(dna: string) {
    if (!dna || dna.length === 0) {
        throw new AppError("Dna is mandatory", 400);
    }
}

function validateDnaContent(dna: string) {
    for (let index = 0; index < dna.length; index++) {
        const letter = dna[index];
        if (letter !== 'A' && letter !== 'C' && letter !== 'G' && letter !== 'T') {
            throw new AppError("Dna should be composed by A,C,G and T", 400)
        }
    }
}

function validateDnaLength(dna: string[]) {
    if (dna[0].length < 4) {
        throw new AppError("A Dna 'Word' must have at least 4 words", 400);
    }

    for (let index = dna.length - 1; index >= 1; index--) {
        const currentWord = dna[index];
        const previousWord = dna[index - 1]

        if (currentWord.length !== previousWord.length) {
            throw new AppError("All words must have the same length", 400)
        }
    }
}
