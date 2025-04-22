import nodeCron from 'node-cron';

import User from '../models/userModel.js';

export const removeUnVerfiedAccount = () => {
  nodeCron.schedule('*/30 * * * * *', async () => {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    await User.deleteMany({
      accountVerified: false,
      createdAt: { $lt: thirtyMinutesAgo }
    });
  });
};
