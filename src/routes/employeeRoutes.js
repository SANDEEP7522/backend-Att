import express from 'express';

import {
  addEmployee,
  getEmployees
} from '../controllers/employeeController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/employee', isAuthenticated, addEmployee);

router.get('/employees', isAuthenticated, getEmployees);

export default router;
