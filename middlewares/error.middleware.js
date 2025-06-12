const errorMiddleware = (err, req, res, next) => {
  try {
    // Log the error for debugging
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      message = messages.join(", ");
      statusCode = 400;
    } else if (err.name === "CastError") {
      message = `Resource not found. Invalid: ${err.path}`;
      statusCode = 404;
    } else if (err.code === 11000) {
      message = `Duplicate field value entered: ${JSON.stringify(
        err.keyValue
      )}`;
      statusCode = 400;
    } else if (err.name === "JsonWebTokenError") {
      message = "Invalid token, please log in again.";
      statusCode = 401;
    } else if (err.name === "TokenExpiredError") {
      message = "Token expired, please log in again.";
      statusCode = 401;
    }

    res.status(statusCode).json({
      success: false,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
