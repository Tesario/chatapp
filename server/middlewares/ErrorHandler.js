import ErrorResponse from "../utils/ErrorResponse.js";

const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.isShow = err.isShow;

  if (err.code === "11000") {
    const message = "Duplicate fields";
    error = new ErrorResponse(message, 400, true);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)[0];
    error = new ErrorResponse(message, 400, true);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
    isShow: error.isShow,
  });
};

export default ErrorHandler;
