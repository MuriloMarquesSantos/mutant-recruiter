import express from 'express';
import routes from './routes';
import { connectDB } from '../database/config';

const PORT = process.env.PORT || 3333;
connectDB();
const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});
