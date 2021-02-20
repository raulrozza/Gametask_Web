import { DefaultTheme } from 'styled-components';

export interface ISwitchThemeArgs {
  primary: string;
  secondary: string;
}

export default interface IThemeProvider {
  theme: DefaultTheme;
  switchTheme: (theme: ISwitchThemeArgs) => Promise<void>;
}
