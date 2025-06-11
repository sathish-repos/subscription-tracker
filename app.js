import express from "express";
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
