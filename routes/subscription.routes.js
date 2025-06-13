import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("get subscriptions");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send(`get subscription with id ${req.params.id}`);
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send(`update subscription with id: ${req.params.id}`);
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send(`delete subscription with id: ${req.params.id}`);
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send(`cancel subscription with id: ${req.params.id}`);
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("get upcoming subscriptions renewals");
});

export default subscriptionRouter;
