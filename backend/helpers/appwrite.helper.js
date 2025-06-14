const { Appwrite } = require('node-appwrite');

const setupAppwrite = () => {
    const client = new Appwrite.client();

    client
        .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite Endpoint
        .setProject(process.env.APPWRITE_PROJECT_ID) // Your Appwrite Project ID
        .setKey(process.env.APPWRITE_API_KEY); // Your Appwrite API Key
    return client;
};

module.exports = {
    setupAppwrite
};