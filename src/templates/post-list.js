import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostItem from "../components/post-item"
import styled from "styled-components"
import CategoryMenu from "../components/category-menu"

const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
`

const Sidebar = styled.div`
  font-size: 0.8rem;
  padding-left: 1rem;
  min-width: 25%;

  & h3 {
    color: #d75a20;
    margin-top: 1rem;
    margin-bottom: 0px;
    font-size: 1.2em;
  }

  & ol {
    margin-block-start: 0.5em;
    margin-block-end: 0px;
  }
`

const PostListTemplate = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { nodes: posts } = data.allMarkdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={pageContext.title} />
      <ContentWrapper>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            const content = post.frontmatter.description || post.excerpt

            return (
              <PostItem
                key={post.fields.slug}
                slug={post.fields.slug}
                title={title}
                author={post.frontmatter.author}
                date={post.frontmatter.date}
                content={content}
                categories={post.frontmatter.categories}
                tags={post.frontmatter.tags}
              />
            )
          })}
        </ol>
        <Sidebar>
          <CategoryMenu />
        </Sidebar>
      </ContentWrapper>
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
          tags {
            name
            display
          }
        }
      }
    }
  }
`
