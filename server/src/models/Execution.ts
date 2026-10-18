
import { Schema, model, InferSchemaType } from "mongoose";

const executionSchema = new Schema(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    input: {
      type: String,
      required: true,
      trim: true,
    },
    output: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["running", "success", "failed"],
      default: "running",
    },
    durationMs: {
      type: Number,
      min: 0,
      default: 0,
    },
    error: {
      type: String,
      default: "",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export type ExecutionType = InferSchemaType<typeof executionSchema>;

const Execution = model<ExecutionType>(
  "Execution",
  executionSchema
);

export default Execution;
