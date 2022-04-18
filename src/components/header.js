import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import MainMenu from "./main-menu"

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
        </LogoLink>
      </h1>
      <MainMenu />
    </header>
  )
}

export default Header
