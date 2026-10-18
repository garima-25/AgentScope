import Execution from "../models/Execution";
import Agent from "../models/Agent";

interface CreateExecutionInput {
  agentId: string;
  input: string;
}

export const createExecution = async (
  data: CreateExecutionInput
) => {
  const agent = await Agent.findById(data.agentId);

  if (!agent) {
    throw new Error("Agent not found");
  }

  const execution = await Execution.create({
    agentId: data.agentId,
    input: data.input,
    status: "running",
    startedAt: new Date(),
  });

  return execution;
};

export const getExecutionsByAgentId = async (
  agentId: string
) => {
  return Execution.find({ agentId }).sort({
    createdAt: -1,
  });
};

interface CompleteExecutionInput {
  output?: string;
  status: "success" | "failed";
  error?: string;
  durationMs: number;
}

export const completeExecution = async (
  executionId: string,
  data: CompleteExecutionInput
) => {
  const execution = await Execution.findById(executionId);

  if (!execution) {
    return null;
  }

  if (execution.status !== "running") {
    throw new Error("Execution has already finished");
  }

  execution.output = data.output ?? "";
  execution.status = data.status;
  execution.error = data.error ?? "";
  execution.durationMs = data.durationMs;
  execution.finishedAt = new Date();

  await execution.save();

  return execution;
};
