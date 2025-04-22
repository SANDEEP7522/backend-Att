import { StatusCodes } from 'http-status-codes';

import * as employeeService from '../services/employeeService.js';
import { validateEmployeeData } from '../utils/commons/emailObject.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/commons/responseObject.js';

export const addEmployee = async (req, res) => {
  const validationError = validateEmployeeData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const employee = await employeeService.createEmployeeService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(employee, 'Employee created successfully'));
  } catch (err) {
    console.error('Error creating employee:', err);
    if (err.statusCode) {
      return res.status(err.statusCode).json(customErrorResponse(err));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployeesService();
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(employees, 'Employees fetched successfully'));
  } catch (err) {
    console.error('Error fetching:', err);
    if (err.statusCode) {
      return res.status(err.statusCode).json(customErrorResponse(err));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};
