import express from 'express';

import {
  checkIn,
  checkOut,
  getAllAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/attendance', checkIn);

router.put('/attendance/:id', checkOut);

router.get('/checkout', getAllAttendance);

export default router;
