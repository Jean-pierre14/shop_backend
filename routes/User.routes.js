import exp from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  createUserSchema,
  validateRequestBody,
} from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/jwtMiddleware.js";

const router = exp.Router();

router
  .route("/")
  .get(verifyToken, getUsers)
  .post(validateRequestBody(createUserSchema), createUser);

router
  .route("/:id")
  .get(verifyToken, getUserById)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
