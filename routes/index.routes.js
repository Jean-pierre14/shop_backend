import exp from "express";
import {
  createData,
  deleteOne,
  getAll,
  getOne,
  updateData,
} from "../controllers/index.controller.js";

const router = exp.Router();

router.route("/").get(getAll).post(createData);

router.route("/:id").get(getOne).put(updateData).delete(deleteOne);

export default router;
