import Link from "next/link";
import { Layout } from "../components/Layout";
import styled from 'styled-components'
import matter from 'gray-matter'

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Card = styled.div`
  margin: 0.75rem 0;
  max-width: 300px;
  border: 1px solid #8F8F8F;
  border-radius: 2px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0px 2px 2px #8F8F8F4F;
  transition: all 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`

const CardImage = styled.img`
  max-width: 240px;
  max-height: 240px;
`

const CardTitle = styled.h4`
  font-style: italic;
  margin: 0;
`

const CardAuthor = styled.h4`
  white-space: pre-line;
  margin: 0;
  margin-top: 1rem;
`

export default function Home(props) {
  const data = props.allBlogs;
  return (
    <Layout>
      <CardContainer>
        {data.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <Card>
              <CardImage src={post.frontmatter.img} />
              <CardTitle>{post.frontmatter.title ? post.frontmatter.title : post.slug}</CardTitle>
              <CardAuthor>{"by\n" + (post.frontmatter.author ? post.frontmatter.author : 'Anonymous')}</CardAuthor>
            </Card>
          </Link>
        ))}
      </CardContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  //get posts & context from folder
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../content/post', true, /\.mdx$/))

  return {
    props: {
      allBlogs: posts,
    },
  }
}
