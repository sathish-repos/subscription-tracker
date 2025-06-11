import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("get users");
});

userRouter.get("/:id", (req, res) => {
  res.send(`get user with id ${req.params.id}`);
});

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
