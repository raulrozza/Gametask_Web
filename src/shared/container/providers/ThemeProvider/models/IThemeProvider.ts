import theme from 'shared/container/providers/ThemeProvider/config/theme';

export interface ISwitchThemeArgs {
  primary: string;
  secondary: string;
}

export default interface IThemeProvider {
  theme: typeof theme;
  switchTheme: (theme: ISwitchThemeArgs) => Promise<void>;
}
