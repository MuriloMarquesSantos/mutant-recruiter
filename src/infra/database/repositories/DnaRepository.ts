import DnaModel from '../models/dna';

export default class DnaRepository {
    async save(dna: any) {
        try {
            console.log("saving,...")
            const savedDna = await DnaModel.create(dna);
            return savedDna 
        } catch(error) {
            console.error(error)
            throw new Error();
        }
    }
}
