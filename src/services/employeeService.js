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

export const getAllEmployeesService = async () => {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error('Failed to fetch employees');
  }
};

export const getEmployeeByIdService = async (id) => {
  try {
    const employee = await Employee.findById(id);
    return employee;
  } catch (error) {
    console.log('Error fetching employee by ID:', error);
    throw new Error('Failed to fetch employee by ID');
  }
};


export const updateEmployeeService = async (id, data) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true });
    return employee;
  } catch (error) {
    console.log('Error updating employee:', error);
    throw new Error('Failed to update employee');
  }
};
