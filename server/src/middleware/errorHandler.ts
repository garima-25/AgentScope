
import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error("API Error:", err);

  // Invalid JSON sent by a client
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    res.status(400).json({
      success: false,
      message: "Invalid JSON in request body",
    });
    return;
  }

  // MongoDB document validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
    });
    return;
  }

  // MongoDB duplicate-key errors
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "A record with this value already exists",
    });
    return;
  }

  
  // Execution state conflicts
  if (
    err instanceof Error &&
    err.message === "Execution has already finished"
  ) {
    res.status(409).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // All other unexpected errors
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });

};

export default errorHandler;

