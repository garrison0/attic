import { staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina } from "tinacms/dist/edit-state";
import styled from 'styled-components'

const query = `query getPost($relativePath: String!) {
  post(relativePath: $relativePath) {
    title
    body
    img
  }
}
`;

const Image = styled.img`
  max-width: 450px;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`

const ImageContainer = styled.div`
  text-align: center;
`

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <h2 style={{marginTop: 0}}>
        {data.post.title}
      </h2>
      <ImageContainer>
        <Image src={data.post.img} />
      </ImageContainer>
      <TinaMarkdown content={data.post.body} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = postsResponse.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    console.log(error);
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
