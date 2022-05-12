/**
 * A component that produce the list of categories of a post.
 */

import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 0.8em;

  & > .label {
    margin-right: 0.5em;
  }
`

const ListWrapper = styled.ul`
  list-style-type: none;
  margin: 0px;

  & > li {
    display: inline-block;
    margin-bottom: 0px;
  }
`

const TagList = ({ tags = [] }) => {
  return (
    <Wrapper>
      {!tags || tags.length === 0 ? (
        <span>Nessun tag</span>
      ) : (
        <>
          <div className="label">Tag:</div>
          <ListWrapper>
            {tags.map((tag, i) => (
              <li key={tag.name}>
                {i > 0 ? <>, </> : null}
                <Link to={`/articles/tag/${tag.name}`}>
                  {tag.display}
                </Link>
              </li>
            ))}
          </ListWrapper>
        </>
      )}
    </Wrapper>
  )
}

export default TagList
