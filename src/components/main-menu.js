import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

const defaultItems = [
  { url: "/", display: "Blog" },
  { url: "/jug/info", display: "JUG" },
]

const Menu = styled.ul`
    list-style-type: none;
    margin-bottom: 0px;
    & > li {
        display: inline-block;
        margin-left: 0.5em;
    }
`

const MainMenu = ({ items = defaultItems }) => {
  return (
    <Menu>
      {items.map(item => (
        <li>
          <Link to={item.url}>{item.display}</Link>
        </li>
      ))}
    </Menu>
  )
}

export default MainMenu
