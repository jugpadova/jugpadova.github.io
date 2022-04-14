import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  & > * {
      margin-right: 0.5em;
  }
`

const Header = ({ title }) => {
  return (
    <header className="global-header">
      <h1 className="main-heading">
        <LogoLink to="/">
          <img src="/icons/icon-144x144.png" alt="JUG Padova Logo" />
          <span>{title}</span>
        </LogoLink>
      </h1>
    </header>
  )
}

export default Header
