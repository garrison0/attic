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
  padding: 2rem;
  text-align: center;
  box-shadow: 0px 2px 2px #8F8F8F4F;
  transition: all 200ms;
  &:hover { 
    transform: translateY(-2px);
    cursor: pointer;
  }
`

const CardImage = styled.img`
  max-width: 280px;
`

const CardTitle = styled.h4`
  font-style: italic;
  margin: 0;
`

const CardText = styled.h4`
  margin: 0;
`

export default function Home(props) {
  const data = props.allBlogs;
  return (
    <Layout>
      <CardContainer>
        {data.map((post) => (
          <Link href={`/posts/${post.slug}`}>
            <Card key={post.slug}>
              <CardImage src={post.frontmatter.img} />
              <CardTitle>{post.frontmatter.title ? post.frontmatter.title : post.slug}</CardTitle>
              <CardText>by</CardText>
              <CardText>{post.frontmatter.author ? post.frontmatter.author : 'Anonymous'}</CardText>
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
