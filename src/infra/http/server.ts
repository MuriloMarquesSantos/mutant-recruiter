import 'reflect-metadata';
import { connectDB } from '../database/config';
import '../../shared/container';
import app from './routes/index'
const PORT = process.env.PORT || 3333;

const connectWithRetry = async() => {
    try {
        await connectDB();
        console.log("MongoDB is connected!");
    } catch (error) {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(connectWithRetry, 5000)
    }
}
connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
});
