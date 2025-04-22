import express from 'express';

import { checkIn, checkOut } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/attendance', checkIn);

router.put('/attendance/:id', checkOut);

export default router;
