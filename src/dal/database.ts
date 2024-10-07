import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('Mongo URI is not defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo successfully');
    } catch (error) {
        console.log('Error cant connect to DB');
        process.exit(1);
    }
}