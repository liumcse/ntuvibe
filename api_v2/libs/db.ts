import { logger } from "../../shared/logger";
import { DB_URI } from "../../shared/config";
import { MongoClient, Db } from "mongodb";

// The singleton MongoClient object
let client: MongoClient;
// The singleton DB object
let db: Db;

/** Connects to database. */
export async function connectToDb() {
  try {
    if (!client) {
      client = new MongoClient(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    if (!client.isConnected()) {
      await client.connect();
    }
  } catch (e) {
    logger.error("Failed to connect to database");
    logger.error(e);
  }
}

/** Returns a database instance. */
export async function getDbInstance() {
  if (!db) {
    await connectToDb();
    db = client.db("db");
  }
  return db;
}
