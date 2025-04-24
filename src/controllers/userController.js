import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { FRONTEND_URL } from '../config/serverConfig.js';
import { catchAsyncError } from '../middlewares/catchAsycError.js';
import ErrorHandler from '../middlewares/error.js';
import User from '../models/userModel.js';
import { generateEmailTemplate } from '../utils/commons/emailObject.js';
import { sendEmail } from '../utils/sendEmail.js';
import { sendToken } from '../utils/sendToken.js';

export const registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, verificationMethod } = req.body;
    if (!name || !email || !password || !verificationMethod) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields are required')
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email, accountVerified: true }]
    });

    if (existingUser) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'User already exists')
      );
    }

    const registrationAttemptUser = await User.find({
      $or: [{ email, accountVerified: false }]
    });

    if (registrationAttemptUser.length > 5) {
      return next(
        new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          'You have reached the limit of registration attempts (5). Try again later after 30 minutes.'
        )
      );
    }

    const user = await User.create({ name, email, password });

    // Generate and save the verification code
    const verificationCode = await user.generateVerificationCode();
    await user.save();

    // Send verification code and wait for it to complete before responding
    await sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      email
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register User Error:', error);
    if (!res.headersSent) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }
});

// ✅ Fixed: `sendVerificationCode` no longer sends multiple responses
export const sendVerificationCode = async (
  verificationMethod,
  verificationCode,
  name,
  email
) => {
  try {
    if (verificationMethod === 'email') {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({ email, subject: 'Email Verification Needed', message });
    } else {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        'Invalid verification method'
      );
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
};

// ✅ Fixed: `verifyOTP` ensures only one response is sent
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const userAllEntries = await User.find({
      $or: [{ email, accountVerified: false }]
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return next(new ErrorHandler(StatusCodes.BAD_REQUEST, 'User not found'));
    }

    let user = userAllEntries[0];

    if (userAllEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [{ email, accountVerified: false }]
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return next(
        new ErrorHandler(StatusCodes.BAD_REQUEST, 'Invalid verification code')
      );
    }

    const verificationCodeExpire = new Date(
      user.verifecationCodeExpire
    ).getTime();
    if (Date.now() > verificationCodeExpire) {
      return next(
        new ErrorHandler(
          StatusCodes.BAD_REQUEST,
          'Verification code has expired'
        )
      );
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verifecationCodeExpire = null;
    await user.save({ validateBeforeSave: true });

    sendToken(user, StatusCodes.OK, 'User verified successfully', res);
  } catch (error) {
    console.error('Error verifying user', error);
    if (!res.headersSent) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error verifying user'
      });
    }
  }
};

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        'Email and Password are required'
      )
    );
  }

  const user = await User.findOne({ email, accountVerified: true }).select(
    '+password'
  );
  if (!user) {
    return next(
      new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    );
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    );
  }

  sendToken(user, StatusCodes.OK, 'Login Successfully', res);
});

export const logout = catchAsyncError(async (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    .json({
      success: true,
      message: 'Logout Successfully'
    });
});

export const getUser = catchAsyncError(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler('Email is required', 400));
  }
  // Fixed: Send email
  const user = await User.findOne({ email, accountVerified: true });

  if (!user) {
    return next(new ErrorHandler(StatusCodes.NOT_FOUND, 'User not found'));
  }
  //  Fixed: Generate reset password token
  const resetPasswordToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${FRONTEND_URL}/password/reset/${resetPasswordToken}`;
  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you did not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email, // sent email to user
      subject: 'MERN Authentication Password Reset',
      message
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    user.resetPasswordToken = undefined; // reset password token
    user.resetPasswordExpire = undefined; // reset password expire
    await user.save({ validateBeforeSave: false }); // save user to database
    return next(
      new ErrorHandler(error.message || 'Cannot send reset password token', 500)
    );
  }
});

export const resetPassword = catchAsyncError(async (req, res) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Password reset token is invalid or has expired'
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Password does not match'
    });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, StatusCodes.OK, 'Password updated successfully', res);
});
