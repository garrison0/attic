import { staticRequest } from "tinacms";
import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  config: {
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "image",
          label: "Image",
          name: "img",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
        {
          type: "datetime",
          label: "Date",
          name: "date",
          ui: {
            dateFormat: 'DD MMMM YYYY'
          }
        },
        {
          type: "object",
          list: true,
          label: "Related Posts",
          name: "relatedPosts",
          fields: [
            {
              type: "reference",
              label: "Related Post",
              name: "relatedPost",
              collections: ["post"],
            },
          ],
        },
        {
          type: "rich-text",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
        },
      ],
    },
  ],
});

export default schema;

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  token: "ccd6c926ad3984800f09fa4233199a644e096309",
  clientId: "c9cac74e-6437-45d6-aca0-04da38aeaf88",
  apiURL,
  schema,
  cmsCallback: (cms) => {
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["page"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return "/";
          }
        }

        if (["post"].includes(collection.name)) {
          return `/posts/${document._sys.filename}`;
        }

        return undefined;
      });

      cms.plugins.add(RouteMapping);
    });
    return cms;
  },
});
