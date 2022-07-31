import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'

const Title = styled.h1`
  margin-bottom: 0;
  &:hover { 
    cursor: pointer;
  } 
`

export const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>the attic</title>
        <meta name="description" content="a place to store thoughts" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Halant&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" /> 
      </Head>
      <header style={{borderBottom: "2px solid black"}}>
        <Link href="/">
          <Title>the attic</Title>
        </Link>
      </header>
      <main>{props.children}</main>
    </div>
  )
}
