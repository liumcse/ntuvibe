import { connectToDb, getDbInstance } from "./connections";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(15000);

let mongod: MongoMemoryServer;
let testUri: string;

async function setUpDb() {
  mongod = new MongoMemoryServer();
  testUri = await mongod.getConnectionString();
}

describe("connectToDb", () => {
  beforeAll(async () => {
    await setUpDb();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should be able to connect to db", async () => {
    // Connect three times
    expect(await connectToDb(testUri)).toBeDefined();
    expect(await connectToDb(testUri)).toBeDefined();
    expect(await connectToDb(testUri)).toBeDefined();
  });
});

describe("getDbInstance", () => {
  beforeAll(async () => {
    await setUpDb();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should be able to get DB instance when connected", async () => {
    await connectToDb(testUri);
    expect(getDbInstance()).toBeDefined();
  });

  it("should throw error when not connected", async () => {
    const client = await connectToDb(testUri);
    await client.close();
    expect(getDbInstance).toThrowError();
  });
});
