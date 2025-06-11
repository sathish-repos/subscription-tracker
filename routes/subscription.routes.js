import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("get subscriptions");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send(`get subscription with id ${req.params.id}`);
});

subscriptionRouter.post("/", (req, res) => {
  res.send("create subscription");
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send(`update subscription with id: ${req.params.id}`);
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send(`delete subscription with id: ${req.params.id}`);
});

subscriptionRouter.get("user/:id", (req, res) => {
  res.send(`get subscriptions for user with id ${req.params.id}`);
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send(`cancel subscription with id: ${req.params.id}`);
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("get upcoming subscriptions renewals");
});

export default subscriptionRouter;
