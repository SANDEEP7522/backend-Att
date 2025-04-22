import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { removeUnVerfiedAccount } from './automation/removeUnVerfiedAccount.js';
import dbConection from './config/dbConfig.js';
import { FRONTEND_URL, PORT } from './config/serverConfig.js';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRoute.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use('/api/v1/users', userRouter);

removeUnVerfiedAccount();

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConection();
});

app.use(errorMiddleware);
