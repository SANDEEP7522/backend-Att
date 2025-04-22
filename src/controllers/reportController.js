import * as reportService from '../services/reportService.js';

export const attendanceSummary = async (req, res) => {
  try {
    const summary = await reportService.generateAttendanceSummary(req.query);
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const absenteeReport = async (req, res) => {
  try {
    const absentees = await reportService.getAbsentees(req.query);
    res.status(200).json(absentees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
