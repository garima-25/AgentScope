
import Agent from "../models/Agent";

interface CreateAgentInput {
  name: string;
  description?: string;
  framework?: string;
}

export const createAgent = async (input: CreateAgentInput) => {
  const agent = await Agent.create({
    name: input.name,
    description: input.description,
    framework: input.framework,
  });

  return agent;
};

export const getAllAgents = async () => {
  return Agent.find().sort({ createdAt: -1 });
};

export const getAgentById = async (id: string) => {
  return Agent.findById(id);
};

export const updateAgent = async (
  id: string,
  input: {
    name?: string;
    description?: string;
    framework?: string;
    status?: "active" | "inactive";
  }
) => {
  return Agent.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
};

export const deleteAgent = async (id: string) => {
  return Agent.findByIdAndDelete(id);
};

