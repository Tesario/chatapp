class ErrorResponse extends Error {
  constructor(message, statusCode, isShow = true) {
    super(message);
    this.statusCode = statusCode;
    this.isShow = isShow;
  }
}

export default ErrorResponse;
