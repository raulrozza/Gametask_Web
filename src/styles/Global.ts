import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
/* Variables defining */
:root{
  /* Theme */
  --primary: #FFFFFF;
  --primary-intense: #FFFFFF;
  --primary-extra-intense: #FFFFFF;
  --primary-low-shade: #e6e6e6;
  --primary-shade: #cccccc;
  --primary-contrast: #1F1F1F;
  --secondary: #852c80;
  --secondary-transparent: #852c8088;
  --secondary-intense: #5f1f5b;
  --secondary-extra-intense: #381336;
  --secondary-low-shade: #ab39a5;
  --secondary-shade: #c651bf;
  --secondary-contrast: #FFF;

  /* Responsiveness */
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

/* Styles */

${({ theme }) => css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body,
  html,
  #root {
    height: 100%;
  }

  body,
  input,
  textarea,
  button {
    font-family: 'Roboto', sans-serif;
    color: ${theme.primaryContrast};
  }

  a {
    color: ${theme.secondaryIntense};
    transition: all 0.2s;

    &:hover {
      color: ${theme.secondaryLowShade};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Open Sans', sans-serif;
  }
`}
`;
