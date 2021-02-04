import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"
import "../styles/post.scss"
import "katex/dist/katex.min.css"
import SEO from "../components/seo"
import TableOfContents from "../components/table-of-contents"


export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        path
        type
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 630) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      body
      tableOfContents
    }
  }
`

const ThemeContext = React.createContext()

const PostTemplate = function({ data: { mdx: post } }) {
  let backTo = "/writing"
  if (post.frontmatter.type === "portfolio") {
    backTo = "/portfolio"
  }
  const [dark, setDark] = useState(false)

  return (
    <Layout theme={dark}>
      <SEO
        title={post.frontmatter.title}
        myFeaturedImage={post.frontmatter.featuredImage}
      />
      <div className={"page-wrapper post h-entry " + (post.frontmatter.type==="post" && "post-wrapper")}>
        
        <h1 className="page-title">{post.frontmatter.title}</h1>
  <a rel='Author' className='p-author h-card hidden' href="https://www.finmoorhouse.com">{post.frontmatter.author}</a>
  <a class="u-url hidden" href={`https://www.finmoorhouse.com${post.frontmatter.path}`}>…</a>
  {!post?.tableOfContents?.items && <hr />}
        {post?.tableOfContents?.items && (
        <TableOfContents items={post.tableOfContents.items} />
      )}
        <MDXRenderer>{post.body}</MDXRenderer>
        <Link className="big" to={backTo}>
          {"⟵ back to " + backTo.slice(1)}
        </Link>
        <br />
        <br />
      </div>
    </Layout>
  )
}
export default PostTemplate
