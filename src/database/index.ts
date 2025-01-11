import mongoose from 'mongoose';
import { config } from '../config/config';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.dbURI, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;