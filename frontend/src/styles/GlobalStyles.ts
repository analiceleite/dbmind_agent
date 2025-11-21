import { createGlobalStyle } from 'styled-components';
import 'highlight.js/styles/github-dark.css';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Nebula";
    src: url("assets/fonts/Nebula-Regular.woff2") format("woff2"),
      url("assets/fonts/Nebula-Regular.woff") format("woff"),
      url("assets/fonts/Nebula-Regular.otf") format("opentype");
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    height: 100vh;
    overflow: hidden;
  }
`;