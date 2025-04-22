import express from 'express';

import { addEmployee } from '../controllers/employeeController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/employee', isAuthenticated, addEmployee);

export default router;
