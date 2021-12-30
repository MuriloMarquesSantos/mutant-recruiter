import express from 'express';
import routes from './routes';
import { connectDB } from '../database/config';

const PORT = process.env.PORT || 3333;
const connectWithRetry = async() => {
    connectDB().then(()=>{
        console.log('MongoDB is connected')
      }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(connectWithRetry, 5000)
      });
}
connectWithRetry();
const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});
