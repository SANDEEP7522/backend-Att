import Attendance from '../models/attendanceSchema.js';

// mark attendance like checkIn when come
export const markAttendance = async (data) => {
  try {
    const attendance = await Attendance.create(data);
    return attendance;
  } catch (err) {
    console.error('Error in markAttendance:', err);
    throw new Error('Failed to mark attendance');
  }
};

// get last attendance for employee
export const getLastAttendance = async (employeeId) => {
  try {
    return await Attendance.findOne({ employee: employeeId }).sort({
      checkIn: -1
    }); // Latest first
  } catch (err) {
    console.error('Error in getLastAttendance:', err);
    throw new Error('Failed to fetch last attendance');
  }
};

export const updateAttendance = async (id, data) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(id, data, { new: true });
    return updated;
  } catch (err) {
    console.error('Error in updateAttendance:', err);
    throw new Error('Failed to update attendance');
  }
};

// get all attendance records for employee
export const getAllAttendance = async (filters = {}) => {
  try {
    const query = {};

    if (filters.startDate && filters.endDate) {
      query.checkIn = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    const records = await Attendance.find(query).populate('employee');
    return records;
  } catch (err) {
    console.error('Error in getAllAttendance:', err);
    throw new Error('Failed to fetch attendance records');
  }
};

// get all attendance records for employee
export const getAttendanceByEmployee = async (employeeId) => {
  try {
    const records = await Attendance.find({ employee: employeeId }).populate(
      'employee'
    );
    return records;
  } catch (err) {
    console.error('Error in getAttendanceByEmployee:', err);
    throw new Error('Failed to fetch attendance for employee');
  }
};
