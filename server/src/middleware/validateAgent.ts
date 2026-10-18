
import type { Request, Response, NextFunction } from "express";

export const validateCreateAgent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, framework } = req.body ?? {};

  if (typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Agent name is required and cannot be empty",
    });
    return;
  }

  if (
    (description !== undefined && typeof description !== "string") ||
    (framework !== undefined && typeof framework !== "string")
  ) {
    res.status(400).json({
      success: false,
      message: "Description and framework must be strings",
    });
    return;
  }

  next();
};

export const validateUpdateAgent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    res.status(400).json({
      success: false,
      message: "Request body must be a JSON object",
    });
    return;
  }

  const allowedFields = [
    "name",
    "description",
    "framework",
    "status",
  ];

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

  if (Object.keys(body).length === 0) {
    res.status(400).json({
      success: false,
      message: "Provide at least one field to update",
    });
    return;
  }

  if (
    "name" in body &&
    (typeof body.name !== "string" || body.name.trim().length === 0)
  ) {
    res.status(400).json({
      success: false,
      message: "Agent name cannot be empty",
    });
    return;
  }

  for (const field of ["description", "framework"] as const) {
    if (field in body && typeof body[field] !== "string") {
      res.status(400).json({
        success: false,
        message: `${field} must be a string`,
      });
      return;
    }
  }

  if (
    "status" in body &&
    body.status !== "active" &&
    body.status !== "inactive"
  ) {
    res.status(400).json({
      success: false,
      message: "Status must be active or inactive",
    });
    return;
  }

  next();
};
