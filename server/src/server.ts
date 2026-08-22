import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "AgentScope API is running 🚀",
  });
});

app.use("/api/health", healthRoutes);

app.listen(PORT, () => {
  console.log(`AgentScope server running on http://localhost:${PORT}`);
});