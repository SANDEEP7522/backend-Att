import { StatusCodes } from 'http-status-codes';

import * as attendanceService from '../services/attendanceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/commons/responseObject.js';

export const checkIn = async (req, res) => {
  try {
    const employeeId = req.body.employee;

    // 1. Check for last attendance record for the employee next 24 hours
    const lastRecord = await attendanceService.getLastAttendance(employeeId);

    if (lastRecord) {
      const now = new Date();
      const lastCheckIn = new Date(lastRecord.checkIn);
      const diffInHours = (now - lastCheckIn) / (1000 * 60 * 60);

      // 2. If last record is less than 24 hours, return error
      if (diffInHours < 24) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: `You can only mark attendance once every 24 hours.`
        });
      }
    }

    // 3. Mark attendance for employee is checked in
    const record = await attendanceService.markAttendance(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(record, 'Attendance marked successfully'));
  } catch (err) {
    console.error('Error in markAttendance:', err);
    if (err.statusCode) {
      return res.status(err.statusCode).json(customErrorResponse(err));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse);
  }
};
