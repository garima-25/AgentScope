
import { Schema, model, InferSchemaType } from "mongoose";

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    framework: {
      type: String,
      default: "custom",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export type AgentType = InferSchemaType<typeof agentSchema>;

const Agent = model<AgentType>("Agent", agentSchema);

export default Agent;
