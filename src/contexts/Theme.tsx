import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import tinyColor from 'tinycolor2';
import { IColorPallete, ChangeThemeProps, ITheme } from 'theme';

import Global from '../styles/Global';

const ThemeContext = createContext({});

export const defaultTheme: IColorPallete = {
  primary: '#FFFFFF',
  primaryTransparent: '#FFFFFF88',
  primaryIntense: '#FFFFFF',
  primaryExtraIntense: '#FFFFFF',
  primaryLowShade: '#e6e6e6',
  primaryShade: '#cccccc',
  primaryExtraShade: '#999999',
  primaryContrast: '#1F1F1F',
  secondary: '#852c80',
  secondaryTransparent: '#852c8088',
  secondaryIntense: '#5f1f5b',
  secondaryExtraIntense: '#381336',
  secondaryLowShade: '#ab39a5',
  secondaryShade: '#c651bf',
  secondaryExtraShade: '#df9edb',
  secondaryContrast: '#FFFFFF',
};

const fillPallete = (key: string, value: string) => {
  const color = tinyColor(value);
  const pallete = {} as IColorPallete;

  pallete[`${key}`] = color.toHexString();
  pallete[`${key}Contrast`] = color.isLight() ? '#1F1F1F' : '#FFF';
  pallete[`${key}LowShade`] = color.isLight()
    ? tinyColor(value).darken(10).toHexString()
    : tinyColor(value).lighten(10).toHexString();
  pallete[`${key}Shade`] = color.isLight()
    ? tinyColor(value).darken(20).toHexString()
    : tinyColor(value).lighten(20).toHexString();
  pallete[`${key}ExtraShade`] = color.isLight()
    ? tinyColor(value).darken(40).toHexString()
    : tinyColor(value).lighten(40).toHexString();
  pallete[`${key}Intense`] = color.isDark()
    ? tinyColor(value).darken(10).toHexString()
    : tinyColor(value).lighten(10).toHexString();
  pallete[`${key}ExtraIntense`] = color.isDark()
    ? tinyColor(value).darken(20).toHexString()
    : tinyColor(value).lighten(20).toHexString();
  pallete[`${key}Transparent`] = tinyColor(value).setAlpha(0.53).toHex8String();

  return pallete;
};

const Theme: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<IColorPallete>(defaultTheme);

  const changeTheme = useCallback(
    ({ primary, secondary }: ChangeThemeProps) => {
      let newTheme = defaultTheme;

      if (primary && secondary) {
        newTheme = {
          ...fillPallete('primary', primary),
          ...fillPallete('secondary', secondary),
        };
      }

      setTheme(newTheme);

      // Setting the secondary color on the app theme, to change the browser's bar color in the phone
      const meta = document.querySelector('meta[name="theme-color"]');

      if (meta) meta.setAttribute('content', newTheme.secondary);
    },
    [],
  );

  useEffect(() => {
    changeTheme({});
  }, [changeTheme]);

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      <ThemeProvider theme={theme}>
        <>
          {children}
          <Global />
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

Theme.propTypes = {
  children: PropTypes.node,
};

export const getTextColor: (color: string) => string = color => {
  const colorObj = tinyColor(color);

  if (colorObj.isLight()) return '#1F1F1F';
  return '#FFF';
};

export const useTheme: () => ITheme = () => {
  const theme = useContext(ThemeContext) as ITheme;

  return theme;
};

export default Theme;
