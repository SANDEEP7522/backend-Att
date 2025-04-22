import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js';
import User from '../models/userModel.js';
import { catchAsyncError } from './catchAsycError.js';

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Please Login to access this resource'
    });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
