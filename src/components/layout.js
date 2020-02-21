import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: 'Montserrat', sans-serif;
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
