// actions/images/uploadImageAction.ts
'use server';

import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImageAction(file: File): Promise<string | null> {
  try {
    if (!file || file.size === 0) return null;
    const buffer = Buffer.from(await file.arrayBuffer());

    const extension = file.name.split('.').pop() || 'jpg';
    const blobName = `${uuidv4()}.${extension}`;

    const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
    const containerName = 'images';
    if (!conn) return null;

    const svc = BlobServiceClient.fromConnectionString(conn);
    const container = svc.getContainerClient(containerName);
    await container.createIfNotExists();
    const blob = container.getBlockBlobClient(blobName);

    await blob.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: file.type || 'application/octet-stream',
      },
    });

    return blob.url.split('?')[0];
  } catch {
    return null;
  }
}
