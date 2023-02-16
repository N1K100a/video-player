import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Mono', monospace;
}
html{
    overflow: hidden;
}
.App{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: aqua;
}
`;
