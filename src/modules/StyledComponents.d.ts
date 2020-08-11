import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryTransparent: string;
    primaryIntense: string;
    primaryExtraIntense: string;
    primaryLowShade: string;
    primaryShade: string;
    primaryContrast: string;
    secondary: string;
    secondaryTransparent: string;
    secondaryIntense: string;
    secondaryExtraIntense: string;
    secondaryLowShade: string;
    secondaryShade: string;
    secondaryContrast: string;
  }
}
