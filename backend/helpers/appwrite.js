const { Client, Storage, ID } = require("appwrite");

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

client.headers["X-Appwrite-Key"] = process.env.APPWRITE_API_KEY;

const storage = new Storage(client);

module.exports = {
  storage,
  ID,
};
