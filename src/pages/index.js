import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostItem from "../components/post-item"
import CategoryMenu from "../components/category-menu"
import styled from "styled-components"
import TagCloud from "../components/tag-cloud"
import Search from "../components/search"

const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
`

const Sidebar = styled.div`
  font-size: 0.8rem;
  padding-left: 1rem;
  width: 25%;

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

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
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
          <Search />
          <CategoryMenu />
          <TagCloud />
        </Sidebar>
      </ContentWrapper>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
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
