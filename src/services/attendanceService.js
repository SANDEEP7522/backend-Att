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
