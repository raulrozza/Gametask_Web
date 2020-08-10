declare module 'theme' {
  export interface IColorPallete {
    primary: string;
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
    statusBar: 'light-content' | 'dark-content' | 'default' | undefined;
    [key: string]: string;
  }
}
