import * as React from "react"
import md5 from "crypto-js/md5"
import styled from "styled-components"

const AuthorWrapper = styled.span`
  display: flex;
  align-items: center;
`

const AuthorImg = styled.img`
  border-radius: 0.5em;
  margin-right: 0.5em;
`

const Author = ({ fullname, email = "john.doe@example.com" }) => {
  const hash = md5(email.trim().toLowerCase())
  const url = `https://secure.gravatar.com/avatar/${hash}?s=40&d=retro`
  return (
    <AuthorWrapper>
      <AuthorImg src={url} alt={fullname} /><span>{fullname}</span>
    </AuthorWrapper>
  )
}

export default Author
