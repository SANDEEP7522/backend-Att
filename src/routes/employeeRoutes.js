import express from 'express';

import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee
} from '../controllers/employeeController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/employee', isAuthenticated, addEmployee);

router.get('/employees', isAuthenticated, getEmployees);

router.get('/employee/:id', isAuthenticated, getEmployee);

router.put('/employee/:id', isAuthenticated, updateEmployee);

router.delete('/employee/:id', isAuthenticated, deleteEmployee);

export default router;
