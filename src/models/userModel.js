import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { JWT_EXPIRE, JWT_SECRET } from '../config/serverConfig.js';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 8 characters long'],
      select: false
    },
    accountVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: Number,
    verifecationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const first = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);

    return parseInt(first + remainingDigits);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verifecationCodeExpire = Date.now() + 10 * 60 * 1000;
  return verificationCode;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
