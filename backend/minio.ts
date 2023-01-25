import {S3Client} from 's3lite/mod.ts';
import { MINIO_ACCESS, MINIO_BUCKET, MINIO_HOST, MINIO_PORT, MINIO_SECRET, MINIO_SECURE } from '../env.ts';

const minioClient = new S3Client({
  endPoint: MINIO_HOST,
  port: parseInt(MINIO_PORT),
  useSSL: MINIO_SECURE === 'true',
  accessKey: MINIO_ACCESS,
  secretKey: MINIO_SECRET,
  region: 'us-east-1',
  bucket: MINIO_BUCKET
});

export function getMinioClient() {
  return minioClient;
}
