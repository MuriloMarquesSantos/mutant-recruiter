import mongoose, {Schema} from 'mongoose';

const dnaSchema: Schema = new Schema({
    dna: {
        type: String,
        unique: [true, 'Dna Sequence must be unique'],
        required: [true, 'Dna Sequence is required']
    },
    isMutant: {
        type: Boolean,
        required: [true, 'IsMutant attrbiute is required']
    }
})

export default mongoose.model('dna', dnaSchema)
