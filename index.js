import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { removeUnVerfiedAccount } from './src/automation/removeUnVerfiedAccount.js';
import dbConection from './src/config/dbConfig.js';
import { FRONTEND_URL, PORT } from './src/config/serverConfig.js';
import { errorMiddleware } from './src/middlewares/error.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';
import employeeRouter from './src/routes/employeeRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';
import userRouter from './src/routes/userRoute.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*************  ✨ Windsurf Command 🌟  *************/
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin); // Dynamically allow the incoming origin
    },
    credentials: true, // Allow credentials
  })
);
/*******  dca79b5e-1421-4483-973c-03dd12653cce  *******/
app.use('/api/v1/users', userRouter);
app.use('/api/v1', employeeRouter);
app.use('/api/v1', attendanceRoutes);
app.use('/api/v1/reports', reportRoutes);

removeUnVerfiedAccount();

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConection();
});

app.use(errorMiddleware);
