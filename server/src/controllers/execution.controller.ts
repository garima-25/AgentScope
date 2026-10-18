
import type { Request, Response, NextFunction } from "express";
import {
  createExecution,
  getExecutionsByAgentId,
  completeExecution,
} from "../services/execution.service";

export const createExecutionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const execution = await createExecution({
      agentId: req.body.agentId,
      input: req.body.input,
    });

    res.status(201).json({
      success: true,
      data: execution,
    });
  } catch (error) {
    next(error);
  }
};

export const getExecutionsByAgentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const executions = await getExecutionsByAgentId(
      req.params.agentId as string
    );

    res.status(200).json({
      success: true,
      count: executions.length,
      data: executions,
    });
  } catch (error) {
    next(error);
  }
};

export const completeExecutionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const execution = await completeExecution(
      req.params.executionId as string,
      {
        output: req.body.output,
        status: req.body.status,
        error: req.body.error,
        durationMs: req.body.durationMs,
      }
    );

    if (!execution) {
      res.status(404).json({
        success: false,
        message: "Execution not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: execution,
    });
  } catch (error) {
    next(error);
  }
};
