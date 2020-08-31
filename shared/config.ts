import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/** DB username. */
export const DB_USERNAME = process.env.DB_USERNAME as string;

/** DB password. */
export const DB_PASSWORD = process.env.DB_PASSWORD as string;

/** DB host address. */
export const DB_HOST = process.env.DB_HOST as string;

/** DB name */
export const DB_NAME = process.env.DB_NAME as string;

/** DB URI. */
export const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
