import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import healthRoutes from "./routes/health.routes";
import agentRoutes from "./routes/agent.routes";
import errorHandler from "./middleware/errorHandler";
import executionRoutes from "./routes/execution.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.json({
    message: "AgentScope API is running 🚀",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/executions", executionRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    // await mongoose.connect(MONGO_URI!);
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`AgentScope server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();