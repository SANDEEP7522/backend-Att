import express from 'express';

import {
  checkIn,
  checkOut,
  getAllAttendance,
  getEmployeeAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/checkedIn', checkIn);

router.put('/checked-out/:id', checkOut);

router.get('/all-attendence', getAllAttendance);

router.get(
  '/get-one-employee-Allattendance/:employeeId',
  getEmployeeAttendance
);

export default router;
