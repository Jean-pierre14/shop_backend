import exp from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  logoutUser,
  createUserSchema,
  validateRequestBody,
  login,
} from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/jwtMiddleware.js";

const router = exp.Router();

router
  .route("/")
  .get(getUsers)
  .post(validateRequestBody(createUserSchema), createUser);

router.post("/login", login);

router.post("/logout", logoutUser);

router
  .route("/:id")
  .get(verifyToken, getUserById)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
