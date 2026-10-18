
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id =
    req.params.id ??
    req.params.agentId ??
    req.params.executionId;

  if (!id || !mongoose.isObjectIdOrHexString(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
    return;
  }

  next();
};
