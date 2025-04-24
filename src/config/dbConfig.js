import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export default async function dbConection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
}
