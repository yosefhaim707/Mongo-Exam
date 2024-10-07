import express from 'express';
import { connectToDB } from './dal/database';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorMiddleware';
import userRouter from './routes/userRoutes';



dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// Middlewares

// Converts all data to json format
app.use(express.json());
// Connects to Mongo
connectToDB();
// Handle common server connection errors
app.use(errorHandler);

app.use('/api/users', userRouter);

// Create listener to the local port
app.listen(PORT, () => {
    try {
        console.log('Server listening to port ' + PORT);
    } catch (error) {
        console.log('Failed to listen to port ' + PORT);
    }
})