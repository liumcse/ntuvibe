"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
/** DB username. */
exports.DB_USERNAME = process.env.DB_USERNAME;
/** DB password. */
exports.DB_PASSWORD = process.env.DB_PASSWORD;
/** DB host address. */
exports.DB_HOST = process.env.DB_HOST;
/** DB name */
exports.DB_NAME = process.env.DB_NAME;
/** DB URI. */
exports.DB_URI = `mongodb+srv://${exports.DB_USERNAME}:${exports.DB_PASSWORD}@${exports.DB_HOST}/${exports.DB_NAME}?retryWrites=true&w=majority`;
