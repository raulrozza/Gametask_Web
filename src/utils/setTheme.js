import tinyColor from 'tinycolor2';

const fillPallete = (key, value) => {
  const color = tinyColor(value);
  let pallete = {};

  pallete[`--${key}`] = color.toHexString();
  pallete[`--${key}-contrast`] = color.isLight() ? '#1F1F1F' : '#FFF';
  pallete[`--${key}-low-shade`] = color.isLight() ?
    tinyColor(value).darken(10).toHexString() :
    tinyColor(value).lighten(10).toHexString();
  pallete[`--${key}-shade`] = color.isLight() ?
    tinyColor(value).darken(20).toHexString() :
    tinyColor(value).lighten(20).toHexString();
  pallete[`--${key}-extra-shade`] = color.isLight() ?
    tinyColor(value).darken(40).toHexString() :
    tinyColor(value).lighten(40).toHexString();
  pallete[`--${key}-intense`] = color.isDark() ?
    tinyColor(value).darken(10).toHexString() :
    tinyColor(value).lighten(10).toHexString();
  pallete[`--${key}-extra-intense`] = color.isDark() ?
    tinyColor(value).darken(20).toHexString() :
    tinyColor(value).lighten(20).toHexString();
  pallete[`--${key}-transparent`] = tinyColor(value).setAlpha(.53).toHex8String();

  return pallete;
}

export const defaultTheme = { primary: '#FFFFFF', secondary: '#852c80' };

export const getTextColor = (color) => {
  const colorObj = tinyColor(color);

  if(colorObj.isLight())
    return "#1F1F1F";
  return "#FFF";
}

export default function setTheme(theme = defaultTheme){
  const { primary, secondary } = theme;

  fillPallete('primary', primary);

  const newTheme = {
    ...fillPallete('primary', primary),
    ...fillPallete('secondary', secondary),
  }

  // Setting the properties on the root element, defining the new CSS variables
  const root = document.querySelector(':root');

  Object.keys(newTheme).map(key => root.style.setProperty(key, newTheme[key]))

  // Setting the secondary color on the app theme, to change the browser's bar color in the phone
  const meta = document.querySelector('meta[name="theme-color"]');

  meta.setAttribute('content', secondary);
}
