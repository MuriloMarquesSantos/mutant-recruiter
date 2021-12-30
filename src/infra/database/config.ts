
import mongoose, {ConnectOptions} from 'mongoose';

const connectDB = async () => {
    const mongoUri = "mongodb://root:root@mongodb:27017/dna?authSource=admin"
    try {
        const connection = await mongoose.connect(mongoUri, {
            auth: {
                authSource: "admin"
            },
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        } as ConnectOptions)

        console.log(`Mongo Database connected in: ${connection.connection.host}`)
    } catch (error) {
        console.error(error)
    }
}


const disconnectDB = async () => {
    await mongoose.disconnect()
}

export {connectDB,  disconnectDB}