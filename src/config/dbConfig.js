import mongoose from 'mongoose';

import { MONGO_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';

export default async function dbConection() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(MONGO_URL);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PROD_DB_URL);
    }
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
}
