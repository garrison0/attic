import { defineConfig, defineSchema } from "tinacms";

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || "main";

const schema = defineSchema({
  config: {
    clientId: '882007dc-cb24-465a-8fd3-2a9a3bb0e75e',
    token: 'ca5f7e7ed8ca7c3aa6548a2f37e43e276e5c168f',
    branch,
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
          type: "datetime",
          label: "Date",
          name: "date",
          ui: {
            dateFormat: 'DD MMMM YYYY'
          }
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

const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
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
