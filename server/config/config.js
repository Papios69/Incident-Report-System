import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",

  port: process.env.PORT || 3000,

  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/safetrack",

  jwtSecret: process.env.JWT_SECRET || "dev_jwt_secret_fallback",
};

export default config;
