
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateCreateExecution = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { agentId, input } = req.body ?? {};

  if (
    typeof agentId !== "string" ||
    !mongoose.isObjectIdOrHexString(agentId)
  ) {
    res.status(400).json({
      success: false,
      message: "A valid agentId is required",
    });
    return;
  }

  if (typeof input !== "string" || input.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Input is required and cannot be empty",
    });
    return;
  }

  next();
};

export const validateCompleteExecution = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({
      success: false,
      message: "Request body must be a JSON object",
    });
    return;
  }

  const allowedFields = ["output", "status", "error", "durationMs"];

  const unexpectedFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unexpectedFields.length > 0) {
    res.status(400).json({
      success: false,
      message: `Unexpected fields: ${unexpectedFields.join(", ")}`,
    });
    return;
  }

  if (
    body.status !== "success" &&
    body.status !== "failed"
  ) {
    res.status(400).json({
      success: false,
      message: "Status must be success or failed",
    });
    return;
  }

  if (
    body.output !== undefined &&
    typeof body.output !== "string"
  ) {
    res.status(400).json({
      success: false,
      message: "Output must be a string",
    });
    return;
  }

  if (
    body.error !== undefined &&
    typeof body.error !== "string"
  ) {
    res.status(400).json({
      success: false,
      message: "Error must be a string",
    });
    return;
  }

  if (
    typeof body.durationMs !== "number" ||
    !Number.isFinite(body.durationMs) ||
    body.durationMs < 0
  ) {
    res.status(400).json({
      success: false,
      message: "Duration must be a non-negative number",
    });
    return;
  }

  if (body.status === "success" && body.error) {
    res.status(400).json({
      success: false,
      message: "A successful execution cannot contain an error",
    });
    return;
  }

  if (body.status === "failed" && !body.error?.trim()) {
    res.status(400).json({
      success: false,
      message: "A failed execution must include an error message",
    });
    return;
  }

  next();
};
