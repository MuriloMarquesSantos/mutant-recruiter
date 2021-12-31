
import mongoose, {ConnectOptions} from 'mongoose';

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || "";
    try {
        const connection = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
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