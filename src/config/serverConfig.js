import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const MONGO_URL = process.env.MONGO_URL;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const TWILIO_SID = process.env.TWILIO_SID;

export const TWILIO_TOKEN = process.env.TWILIO_TOKEN;

// export const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// mail otp
export const SMTP_HOST = process.env.SMTP_HOST;

export const SMTP_SERVICE = process.env.SMTP_SERVICE;

export const SMTP_PORT = process.env.SMTP_PORT;

export const SMTP_USER = process.env.SMTP_USER;

export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRE = process.env.JWT_EXPIRE;

export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;
