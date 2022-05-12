import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const Wrapper = styled.nav``

const TagCloud = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 5000
        filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
      ) {
        group(field: frontmatter___tags___name) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
              tags {
                name
                display
              }
            }
          }
        }
      }
    }
  `)
  const tags = data.allMarkdownRemark.group
  const cloudTags = tags
    .map(tag => {
      return {
        name: tag.fieldValue,
        display: tag.nodes[0].frontmatter.tags.find(
          t => t.name === tag.fieldValue
        ).display,
        totalCount: tag.totalCount,
      }
    })
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 40)
    .sort((a, b) =>
      a.display.toLowerCase().localeCompare(b.display.toLowerCase())
    )
  const [min, max] = cloudTags
    .map(tag => tag.totalCount)
    .reduce(
      ([prevMin, prevMax], curr) => [
        Math.min(prevMin, curr),
        Math.max(prevMax, curr),
      ],
      [Infinity, -Infinity]
    )
  return (
    <Wrapper>
      <h3>Tag</h3>
      <div>
        {cloudTags.map(tag => (
          <span
            key={tag.name}
            style={{
              fontSize:
                66 + ((tag.totalCount - min) * (200 - 66)) / (max - min) + "%",
            }}
          >
            <Link to={`/articles/tag/${tag.name}`}>{tag.display}</Link><span> </span>
          </span>
        ))}
      </div>
    </Wrapper>
  )
}

export default TagCloud
