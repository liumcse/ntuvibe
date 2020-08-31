import { MongoClient, Db } from "mongodb";
import * as config from "../../config";

let db: Db;
let client: MongoClient;

/** Connects to database. */
export async function connectToDb(dbUri?: string) {
  if (!client) {
    client = new MongoClient(dbUri || config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  if (!client.isConnected()) {
    await client.connect();
  }
}

/** Returns a DB instance. */
export function getDbInstance() {
  if (!db) {
    db = client.db(config.DB_NAME);
  }
  return db;
}
