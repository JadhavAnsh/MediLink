// src/lib/appwrite.js
import { Client, Databases, ID, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

// client.headers['X-Appwrite-Key'] = process.env.APPWRITE_API_KEY;

const databases = new Databases(client);
const storage = new Storage(client);

// client.ping = async () => {
//   return await databases.listDocuments(process.env.NEXT_PUBLIC_API_APPWRITE_DATABASE_ID);
// };

export { client, databases, ID, storage };

