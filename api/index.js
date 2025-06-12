import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "../config/env.js";
import authRoutes from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import subscriptionRouter from "../routes/subscription.routes.js";
import connectToMongooseDB from "../database/mongoose.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) =>
  res.send("<h1> welcome to subscription tracker </h1>")
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  connectToMongooseDB();
});

export default app;
