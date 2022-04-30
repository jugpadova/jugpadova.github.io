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
  margin-top: 0.5em;

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

const CategoryList = ({ categories = [] }) => {
  return (
    <Wrapper>
      {!categories || categories.length === 0 ? (
        <span>Nessuna categoria</span>
      ) : (
        <>
          <div className="label">Categorie:</div>
          <ListWrapper>
            {categories.map((category, i) => (
              <li key={category.permalink}>
                {i > 0 ? <>, </> : null}
                <Link to={`/articles/category/${category.permalink}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ListWrapper>
        </>
      )}
    </Wrapper>
  )
}

export default CategoryList
