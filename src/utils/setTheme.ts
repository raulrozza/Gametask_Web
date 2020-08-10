import tinyColor from 'tinycolor2';
import { IColorPallete } from 'theme';

const fillPallete = (key: string, value: string) => {
  const color = tinyColor(value);
  const pallete = {} as IColorPallete;

  pallete[`--${key}`] = color.toHexString();
  pallete[`--${key}-contrast`] = color.isLight() ? '#1F1F1F' : '#FFF';
  pallete[`--${key}-low-shade`] = color.isLight()
    ? tinyColor(value).darken(10).toHexString()
    : tinyColor(value).lighten(10).toHexString();
  pallete[`--${key}-shade`] = color.isLight()
    ? tinyColor(value).darken(20).toHexString()
    : tinyColor(value).lighten(20).toHexString();
  pallete[`--${key}-extra-shade`] = color.isLight()
    ? tinyColor(value).darken(40).toHexString()
    : tinyColor(value).lighten(40).toHexString();
  pallete[`--${key}-intense`] = color.isDark()
    ? tinyColor(value).darken(10).toHexString()
    : tinyColor(value).lighten(10).toHexString();
  pallete[`--${key}-extra-intense`] = color.isDark()
    ? tinyColor(value).darken(20).toHexString()
    : tinyColor(value).lighten(20).toHexString();
  pallete[`--${key}-transparent`] = tinyColor(value)
    .setAlpha(0.53)
    .toHex8String();

  return pallete;
};

export const defaultTheme = {
  ...fillPallete('primary', '#FFFFFF'),
  ...fillPallete('secondary', '#852c80'),
};

export const getTextColor: (color: string) => string = color => {
  const colorObj = tinyColor(color);

  if (colorObj.isLight()) return '#1F1F1F';
  return '#FFF';
};

const setTheme: (theme?: IColorPallete) => void = (theme = defaultTheme) => {
  const { primary, secondary } = theme;

  fillPallete('primary', primary);

  const newTheme = {
    ...fillPallete('primary', primary),
    ...fillPallete('secondary', secondary),
  };

  // Setting the properties on the root element, defining the new CSS variables
  const root: HTMLElement | null = document.querySelector(':root');

  if (root)
    Object.keys(newTheme).map(key =>
      root.style.setProperty(key, newTheme[key]),
    );

  // Setting the secondary color on the app theme, to change the browser's bar color in the phone
  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) meta.setAttribute('content', secondary);
};

export default setTheme;
