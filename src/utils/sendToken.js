import { COOKIE_EXPIRE } from '../config/serverConfig.js';

export const sendToken = (user, statusCode, message, res) => {
  //   console.log('sendToken', user, statusCode, message, res);

  if (res.headersSent) {
    console.error('Headers already sent, skipping response.');
    return;
  }

  const token = user.generateToken();
  //   console.log('token', token);

  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message, // ✅ Fixed duplicate message
    token,
    user
  });
};
