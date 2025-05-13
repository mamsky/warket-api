import dotenv from "dotenv";
import { ConfigExpress } from "../utils/types/config.types";
dotenv.config();

const config: ConfigExpress = {
  port: Number(process.env.PORT) || 1731,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
