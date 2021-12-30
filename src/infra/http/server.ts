import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { connectDB } from '../database/config';
import AppError from '../errors/AppError';

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
const app = express();
app.use(express.json());
app.use(routes);


app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
  
      console.error(error);
  
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    },
  );

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});
