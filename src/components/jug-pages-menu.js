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
    list-style-type: none;
`

const JugPagesMenu = ({ items = defaultItems }) => {
  return (
    <Menu>
      {items.map(item => (
        <li key={item.url}>
          <Link to={item.url}>{item.display}</Link>
        </li>
      ))}
    </Menu>
  )
}

export default JugPagesMenu
