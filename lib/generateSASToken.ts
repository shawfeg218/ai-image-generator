import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

const accountKey = process.env.ACCOUNTKEY;
const accountName = process.env.ACCOUNTNAME;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServerClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function generateSASToken() {
  const containerClient = blobServerClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.read = true;
  permissions.write = true;
  permissions.create = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions,
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}
