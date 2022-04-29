import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostItem from "../components/post-item"

const PostListTemplate = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { nodes: posts } = data.allMarkdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={pageContext.title} />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const content = post.frontmatter.description || post.excerpt

          return (
            <PostItem
              slug={post.fields.slug}
              title={title}
              author={post.frontmatter.author}
              date={post.frontmatter.date}
              content={content}
              categories={post.frontmatter.categories}
            />
          )
        })}
      </ol>
    </Layout>
  )
}

export default PostListTemplate

export const pageQuery = graphql`
  query PostListByFilter($filter: MarkdownRemarkFilterInput) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: $filter
      limit: 1000
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true, locale: "it")
          title
          description
          author {
            username
            fullname
            email
          }
          categories {
            name
            permalink
          }
        }
      }
    }
  }
`
