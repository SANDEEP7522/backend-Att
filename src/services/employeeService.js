import Employee from '../models/employeeSchema.js';

export const createEmployeeService = async (data) => {
  try {
    const employee = await Employee.create(data);
    return employee;
  } catch (error) {
    console.log('Error creating employee:', error);
    throw new Error('Failed to create employee');
  }
};
