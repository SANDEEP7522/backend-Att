import express from 'express';

import {
  checkIn,
  checkOut,
  getAllAttendance,
  getEmployeeAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/attendance', checkIn);

router.put('/attendance/:id', checkOut);

router.get('/checkout', getAllAttendance);

router.get('/get-employee-attendance/:employeeId', getEmployeeAttendance);

export default router;
