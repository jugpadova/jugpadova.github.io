import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import JugPagesMenu from "../components/jug-pages-menu"

const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
`

const Sidebar = styled.div`
  padding-left: 0.5em;
`

const SinglePageTemplate = ({ data, location }) => {
  const page = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />
      <ContentWrapper>
        <article
          className="single-page"
          itemScope
          itemType="http://schema.org/Article"
        >
          <section
            dangerouslySetInnerHTML={{ __html: page.html }}
            itemProp="articleBody"
          />
        </article>
        <Sidebar>
          <JugPagesMenu />
        </Sidebar>
      </ContentWrapper>
    </Layout>
  )
}

export default SinglePageTemplate

export const pageQuery = graphql`
  query SinglePageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "it")
        description
        author {
          username
          fullname
          email
        }
      }
    }
  }
`
