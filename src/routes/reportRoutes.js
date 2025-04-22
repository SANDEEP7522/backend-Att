import express from 'express';

import {
  absenteeReport,
  attendanceSummary
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/attendance', attendanceSummary);

router.get('/absentees', absenteeReport);

export default router;
