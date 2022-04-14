/**
 * A component that produce the person full name with its gravatar image.
 */

import * as React from "react"
import md5 from "crypto-js/md5"
import styled from "styled-components"

const GravatarWrapper = styled.span`
  display: flex;
  align-items: center;
`

const GravatarImg = styled.img`
  border-radius: 0.5em;
  margin-right: 0.5em;
`

const Gravatar = ({ fullname, email = "john.doe@example.com" }) => {
  const hash = md5(email.trim().toLowerCase())
  const url = `https://secure.gravatar.com/avatar/${hash}?s=40&d=retro`
  return (
    <GravatarWrapper>
      <GravatarImg src={url} alt={fullname} /><span>{fullname}</span>
    </GravatarWrapper>
  )
}

export default Gravatar
