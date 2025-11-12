import { S3Client } from 'bun';
import sharp from 'sharp';

// Bun's S3Client can read from env, but we'll create an explicit client
// to match the original code's structure.
const client = new S3Client({
  endpoint: `http://${process.env.VERSITY_URL}`,
  accessKeyId: process.env.VERSITY_KEY,
  secretAccessKey: process.env.VERSITY_SECRET,
  bucket: process.env.VERSITY_BUCKET,
  // For S3-compatible services like VersityGW, region is not strictly
  // necessary but can prevent potential issues.
  region: 'us-east-1',
});

export async function uploadImage(file: File) {
  const buffer = await file.arrayBuffer();
  const output = await sharp(buffer)
    .resize(1000, 600, { withoutEnlargement: true })
    .webp()
    .toBuffer();

  const id = crypto.randomUUID();

  // Use the client's write method for a direct upload.
  // We can also specify the content type.
  await client.write(id, output, {
    type: 'image/webp',
  });

  return id;
}

export async function getImageResponseStream(id:string) {
  // Get a lazy reference to the S3 file
  const s3File = client.file(id);

  // Use .stat() to get metadata like size without downloading the file
  const { size } = await s3File.stat();

  // Return a new Response with the file's readable stream
  return new Response(s3File.stream(), {
    headers: {
      'content-length': size.toString(),
      'content-type': 'image/webp',
    },
  });
}

export async function deleteImage(id: string) {
  // Use the client's delete method
  await client.delete(id);
}