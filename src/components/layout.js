import React from "react"
import style from "./layout.module.css"
import {Link} from "gatsby"
import {rhythm} from "../utils/typography"

export default props => (
  <div className={style.layout}>
    <header>
      <Link to="/">
        <h3>A Programmer's Perspective</h3>
      </Link>
      <nav>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About Me</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>
    </header>

    <div className={style.title}>
      <h1>{props.title}</h1>
      {!props.hidePagination && <h3>Page {props.currentPage}/{props.numPages}</h3>}
    </div>

    <div style={{marginBottom: rhythm(1)}}>
      {props.children}
    </div>

    <footer>
      Copyright &copy; 2020. A Programmer's Perspective is built with Gatsby.js. The repository can be found <a
      href="https://github.com/woojiahao/woojiahao.github.io.development">here.</a>
    </footer>
  </div>
)
