import exp from "express";

const router = exp.Router();

router.route("/").get().post();

router.route("/:id").get().put().delete(deleteUser);

export default router;
