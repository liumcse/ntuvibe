import { MongoClient, Db } from "mongodb";

const USERNAME = "admin";
const PASSWORD = "admin";
const DB_NAME = "db";
const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.vz30l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

let db: Db;
let client: MongoClient;

/** Connects to database. */
export async function connectToDb(dbUri?: string) {
  if (!client) {
    client = new MongoClient(dbUri || DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await client.connect();
}

/** Returns a DB instance. */
export function getDbInstance() {
  if (!db) {
    db = client.db(DB_NAME);
  }
  return db;
}
