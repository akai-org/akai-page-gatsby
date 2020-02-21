import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

import { theme } from "./theme"

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: 'Montserrat', sans-serif;
  }
`

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledWrapper>
        <main>{children}</main>
      </StyledWrapper>
    </ThemeProvider>
  )
}

export default Layout
