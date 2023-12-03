const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.ACCOUNTNAME;
const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();
    console.log("prompt: ", prompt);

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      const image_url = response.data[0].url;

      // download image as arraybuffer
      const res = await axios.get(image_url, { responseType: "arraybuffer" });
      const arrayBuffer = res.data;

      const sasToken = await generateSASToken();

      const blobServerClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient = blobServerClient.getContainerClient(containerName);

      // generate current timestamp
      const timestamp = Date.now();
      const file_name = `${prompt}_${timestamp}.png`;

      const blockBlobClient = containerClient.getBlockBlobClient(file_name);

      await blockBlobClient.uploadData(arrayBuffer);
      console.log("upload image success");
    } catch (err) {
      console.log("upload image failed: ", err.message);
    }
  },
});
