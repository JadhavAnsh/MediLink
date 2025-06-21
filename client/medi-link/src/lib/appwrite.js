'use client';

import { Client, ID, Storage } from "appwrite";

const client = new Client();

if (typeof window !== "undefined") {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
}

const storage = new Storage(client);

export { client, ID, storage };
