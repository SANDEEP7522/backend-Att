import Attendance from '../models/attendanceSchema.js';
import Employee from '../models/employeeSchema.js';

export const generateAttendanceSummary = async ({ month, year }) => {
  const start = new Date(`${year}-${month}-01`);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);

  const data = await Attendance.aggregate([
    {
      $match: {
        checkIn: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: '$employee',
        totalDaysPresent: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'employees',
        localField: '_id',
        foreignField: '_id',
        as: 'employeeInfo'
      }
    },
    {
      $unwind: '$employeeInfo'
    },
    {
      $project: {
        name: '$employeeInfo.name',
        designation: '$employeeInfo.designation',
        totalDaysPresent: 1
      }
    }
  ]);

  return data;
};

export const getAbsentees = async ({ date }) => {
  const targetDate = new Date(date);
  const start = new Date(targetDate.setHours(0, 0, 0, 0));
  const end = new Date(targetDate.setHours(23, 59, 59, 999));

  const presentEmployeeIds = await Attendance.distinct('employee', {
    checkIn: { $gte: start, $lte: end }
  });

  const absentees = await Employee.find({
    _id: { $nin: presentEmployeeIds }
  });

  return absentees;
};
