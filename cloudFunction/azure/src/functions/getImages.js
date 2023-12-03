const { app } = require("@azure/functions");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.ACCOUNTNAME;
const accountKey = process.env.ACCOUNTKEY;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServerClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServerClient.getContainerClient(containerName);
    const sasToken = await generateSASToken();

    const imageUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      const imgUrl = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${imgUrl}`;
      imageUrls.push({ url, name: blob.name });
    }

    const sortedImgUrls = imageUrls.sort((a, b) => {
      // Ex: draw-a-cat_1630146223123.png
      const aTimestamp = a.name.split("_")[1].split(".")[0];
      const bTimestamp = b.name.split("_")[1].split(".")[0];
      return bTimestamp - aTimestamp;
    });

    context.log(`Http function processed request for url ${request.url}`);

    return {
      jsonBody: {
        imageUrls: sortedImgUrls,
      },
    };
  },
});
