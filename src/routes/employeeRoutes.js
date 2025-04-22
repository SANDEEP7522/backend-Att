import express from 'express';

import {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee
} from '../controllers/employeeController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/employee', isAuthenticated, addEmployee);

router.get('/employees', isAuthenticated, getEmployees);

router.get('/employee/:id', isAuthenticated, getEmployee);

router.put('/employee/:id', isAuthenticated,  updateEmployee);

export default router;
