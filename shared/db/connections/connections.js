"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config = require("../../config");
let db;
let client;
/** Connects to database. */
async function connectToDb(dbUri) {
    if (!client) {
        client = new mongodb_1.MongoClient(dbUri || config.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    if (!client.isConnected()) {
        await client.connect();
    }
    return client;
}
exports.connectToDb = connectToDb;
/** Returns a DB instance. */
function getDbInstance() {
    if (!client.isConnected()) {
        throw new Error("Not connected to DB.");
    }
    if (!db) {
        db = client.db(config.DB_NAME);
    }
    return db;
}
exports.getDbInstance = getDbInstance;
