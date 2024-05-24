import { MINIO_KEY, MINIO_SECRET, MINIO_URL, MINIO_BUCKET, MINIO_PORT } from '$env/static/private';
import { Client } from "minio";
import sharp from 'sharp';

const client = new Client({
    endPoint: MINIO_URL,
    port: MINIO_PORT,
    useSSL: false,
    accessKey: MINIO_KEY,
    secretKey: MINIO_SECRET,
});

export async function uploadImage(file: File) {
    const buffer = await file.arrayBuffer();
    const output = await sharp(buffer)
        .resize(1000, 600, { withoutEnlargement: true })
        .webp()
        .toBuffer();

    const id = crypto.randomUUID();
    await client.putObject(MINIO_BUCKET, id, output);
    return id;
}

export async function getImageResponseStream(id: string) {
    const { size } = await client.statObject(MINIO_BUCKET, id);
    const stream = await client.getObject(MINIO_BUCKET, id);

    return new Response(stream, {
        headers: {
            'content-size': size,
            'content-type': 'image/webp'
        }
    })
}