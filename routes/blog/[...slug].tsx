import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { gfm } from '../../utils/markdown.ts';
import {getDatabase} from '../../backend/mongo.ts';


interface Data {
  markdown: string;
  slug: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const slug = ctx.params.slug;

    console.log(getDatabase())

    const markdown = `
# Hello World

test
    `;
    const resp = ctx.render({ slug, markdown });

    return resp;
  },
};

export default function BlogPost(props: PageProps<Data>) {
  const { slug, markdown } = props.data;

  const renderedMarkdown = gfm.render(markdown);
  return (
    <>
      <Head>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1>{slug}</h1>
        <div
          class="mt-6 markdown-body"
          dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
        />
      </div>
    </>
  );
}
