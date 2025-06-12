import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";

if (!MONGO_URI) {
  throw new Error(
    `MONGO_URI is not defined in the ${NODE_ENV} environment variables.`
  );
}

const connectToMongooseDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${NODE_ENV} environment`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error.message}`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectToMongooseDB;
