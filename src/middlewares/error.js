class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // this.message = message;
  }
}

export const errorMiddleware = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(400, message);
  }
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(400, message);
  }
  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(400, message);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

export default ErrorHandler;
