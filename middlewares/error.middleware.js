const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Log the error for debugging
    console.error(err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      error = new Error(messages.join(", "));
      error.statusCode = 400;
    }
    if (err.name === "CastError") {
      error = new Error(`Resource not found. Invalid: ${err.path}`);
      error.statusCode = 404;
    }
    if (err.code === 11000) {
      error = new Error(`Duplicate field value entered: ${err.keyValue.email}`);
      error.statusCode = 400;
    }
    if (err.name === "JsonWebTokenError") {
      error = new Error("Invalid token, please log in again.");
      error.statusCode = 401;
    }
    if (err.name === "TokenExpiredError") {
      error = new Error("Token expired, please log in again.");
      error.statusCode = 401;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;