import { Router } from "express";
import { createTask, getUserTasks, deleteTask, updateTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createTask);
router.route("/").get(verifyJWT, getUserTasks);
router.route("/:taskId").put(verifyJWT, updateTask); // Changed to postId
router.route("/:taskId").delete(verifyJWT, deleteTask); // Changed to postId

export default router;