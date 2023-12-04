"use server";

import { openai } from "@/lib/openai";
import axios from "axios";
import { generateSASToken } from "@/lib/generateSASToken";
import { BlobServiceClient } from "@azure/storage-blob";
import { revalidateTag } from "next/cache";

const accountName = process.env.ACCOUNTNAME;
const containerName = "images";

export async function generateImage(prompt: string) {
  console.log("prompt: ", prompt);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;

    if (!image_url) {
      throw new Error("Error generating image from DALL-E");
    }

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

    revalidateTag("images");
  } catch (err) {
    console.log("Error in generateImage: ", err);
  }
}
