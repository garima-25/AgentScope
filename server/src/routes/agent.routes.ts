import { validateObjectId } from "../middleware/validateObjectId";
import { Router } from "express";
import {
  createAgentController,
  getAllAgentsController,
  getAgentByIdController,
  updateAgentController,
  deleteAgentController,
} from "../controllers/agent.controller";

import {
  validateCreateAgent,
  validateUpdateAgent,
} from "../middleware/validateAgent";


const router = Router();

router.post("/", validateCreateAgent, createAgentController);
router.get("/", getAllAgentsController);
router.get("/:id", validateObjectId, getAgentByIdController);

router.patch(
  "/:id",
  validateObjectId,
  validateUpdateAgent,
  updateAgentController
);

router.delete("/:id", validateObjectId, deleteAgentController);

export default router;
