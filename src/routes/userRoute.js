import express from 'express';

import {
  forgetPassword,
  getUser,
  login,
  logout,
  registerUser,
  resetPassword,
  verifyOTP
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/verify-otp', verifyOTP);

router.post('/login', login);

router.get('/logout', isAuthenticated, logout);

router.get('/user', isAuthenticated, getUser);

router.post('/password/forget', forgetPassword);

router.put('/password/reset/:token', resetPassword);

export default router;
