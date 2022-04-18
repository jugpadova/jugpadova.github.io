import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

const defaultItems = [
  { url: "/jug/info", display: "Informazioni" },
  { url: "/jug/story", display: "Storia" },
  { url: "/jug/association", display: "Associazione" },
  { url: "/jug/people", display: "Persone" },
  { url: "/jug/library", display: "Biblioteca" },
]

const Menu = styled.ul`
    list-style-type: square;
    margin-bottom: 0px;
    & > li {
        display: inline-block;
        margin-left: 0.5em;
    }
`

const JugPagesMenu = ({ items = defaultItems }) => {
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

export default JugPagesMenu
