import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must enter a name'],
      minlength: [3, 'Username must be at least 3 charator'],
      match: [/^[a-zA-Z0-9]+$/, 'Username must be alaphanumeric']
    },
    designation: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: [true, 'Must enter a department']
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
