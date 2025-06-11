import express from "express";
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToMongooseDB from "./database/mongoose.js";

const app = express();

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  connectToMongooseDB();
});

export default app;
