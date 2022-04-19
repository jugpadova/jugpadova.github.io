import { Link } from "gatsby"
import * as React from "react"
import Alert from "./alert"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header title={title} />
      <Alert type="warning">
        <div className="title">Questo sito è ancora in costruzione.</div>
        <div>L'attuale sito ufficiale del JUG Padova è all'indirizzo <a href="http://www.jugpadova.it">www.jugpadova.it</a></div>
      </Alert>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
