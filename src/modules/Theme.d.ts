declare module 'theme' {
  import { DefaultTheme } from 'styled-components';

  export interface IColorPallete extends DefaultTheme {
    statusBar?: 'light-content' | 'dark-content' | 'default' | undefined;
    [key: string]: string;
  }

  export interface ChangeThemeProps {
    primary: string;
    secondary: string;
  }
}
