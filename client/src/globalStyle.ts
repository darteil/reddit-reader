import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: black;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .styled-scroll {
    overflow-y: scroll;
  }
  .styled-scroll::-webkit-scrollbar {
    width: 10px;
  }
  .styled-scroll::-webkit-scrollbar-track {
    background-color: #eeeeee;
  }
  .styled-scroll::-webkit-scrollbar-thumb {
    background-color: #999999;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export default GlobalStyle;
