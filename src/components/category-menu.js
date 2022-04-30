import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const Wrapper = styled.nav`
  & > ol {
    list-style-type: none;
  }

  & > ol > li {
    margin-bottom: 0.5em;
    white-space: nowrap;
  }
`

const CategoryMenu = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 5000
        filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
      ) {
        group(field: frontmatter___categories___permalink) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
              categories {
                name
                permalink
              }
            }
          }
        }
      }
    }
  `)
  const categories = data.allMarkdownRemark.group
  return (
    <Wrapper>
      <h3>Categorie</h3>
      <ol>
        {categories.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/articles/category/${category.fieldValue}`}>
              {category.nodes[0].frontmatter.categories.find(c => c.permalink === category.fieldValue).name}
            </Link>{" "}
            ({category.totalCount})
          </li>
        ))}
      </ol>
    </Wrapper>
  )
}

export default CategoryMenu
