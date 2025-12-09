import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, "../../.env");


dotenv.config({ path: rootEnvPath });

const config = {
  port: process.env.PORT || 3000,

  jwtSecret: process.env.JWT_SECRET || "fallbackSecret123",

  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/IncidentReportSystem",

  env: process.env.NODE_ENV || "development",
};

export default config;
