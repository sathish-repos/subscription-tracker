import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send("create user");
});

userRouter.put("/:id", (req, res) => {
  res.send(`update user with id: ${req.params.id}`);
});

userRouter.delete("/:id", (req, res) => {
  res.send(`delete user with id: ${req.params.id}`);
});

export default userRouter;
