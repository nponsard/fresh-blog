import { Handlers, PageProps } from '$fresh/server.ts';
import { getMinioClient } from '../../backend/minio.ts';
import { decode, Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts';
import { resize } from 'https://deno.land/x/deno_image/mod.ts';

interface Data {
  markdown: string;
  slug: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const filename = ctx.params.file;

    const minio = getMinioClient();

    const obj = await minio.getObject(filename);

    const buffer = await (await obj.blob()).arrayBuffer();

    let start = Date.now();
  


    const decoded = await decode(buffer);

    const resized = await decoded.resize(100, Image.RESIZE_AUTO);

    if (!resized) {
      return ctx.renderNotFound();
    }

    const encoded = await resized.encodeJPEG(95);

    console.log('imagescript took', Date.now() - start, 'ms');


    start = Date.now();

    const arr = new Uint8Array(buffer);

    const resized2 = await resize(arr, {
      aspectRatio: true,
      width: 100,
      height: 100,
    });

    console.log('deno_image took', Date.now() - start, 'ms');

    return new Response(encoded);
  },
};
