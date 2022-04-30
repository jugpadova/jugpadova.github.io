import * as React from "react"
import { Link } from "gatsby"
import Gravatar from "../components/gravatar"
import styled from "styled-components"
import CategoryList from "./category-list"
import TagList from "./tag-list"

const AuthorWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  & > * {
    margin-right: 0.5em;
  }
`

const LinksWrapper = styled.nav`
  display: flex ;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;

  & > * {
    margin-left: 0.5em;
  }
`

const PostItem = ({ slug, title, author, date, content, categories, tags }) => {
  return (
    <li key={slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <AuthorWrapper>
            <Gravatar {...author} />
            <span>|</span>
            <span>{date}</span>
          </AuthorWrapper>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            itemProp="description"
          />
        </section>
        <LinksWrapper>
            <CategoryList categories={categories}/>
            <div>|</div>
            <TagList tags={tags}/>
        </LinksWrapper>
      </article>
    </li>
  )
}

export default PostItem
