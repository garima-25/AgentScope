
import { Router } from "express";
import {
  createExecutionController,
  getExecutionsByAgentController,
  completeExecutionController,
} from "../controllers/execution.controller";
import { validateObjectId } from "../middleware/validateObjectId";
import { 
    validateCreateExecution,
    validateCompleteExecution,    
 } from "../middleware/validateExecution";

const router = Router();

router.post("/", validateCreateExecution, createExecutionController);
router.get("/agent/:agentId", validateObjectId, getExecutionsByAgentController);

router.patch(
  "/:executionId/complete",
  validateObjectId,
  validateCompleteExecution,
  completeExecutionController
);

export default router;
