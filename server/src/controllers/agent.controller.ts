
import type { Request, Response, NextFunction } from "express";
import {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../services/agent.service";

export const createAgentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = await createAgent(req.body);
    res.status(201).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAgentsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await getAllAgents();
    res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

export const getAgentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = await getAgentById(req.params.id as string);

    if (!agent) {
      res.status(404).json({
        success: false,
        message: "Agent not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAgentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = await updateAgent(
      req.params.id as string,
      req.body
    );

    if (!agent) {
      res.status(404).json({
        success: false,
        message: "Agent not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAgentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = await deleteAgent(req.params.id as string);

    if (!agent) {
      res.status(404).json({
        success: false,
        message: "Agent not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
      data: agent,
    });
  } catch (error) {
    next(error);
  }
};
