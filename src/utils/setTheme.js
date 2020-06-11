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

export default function setTheme(theme = { primary: '#FFFFFF', secondary: '#852c80' }){
  const { primary, secondary } = theme;

  fillPallete('primary', primary);

  const newTheme = {
    ...fillPallete('primary', primary),
    ...fillPallete('secondary', secondary),
  }

  const root = document.querySelector(':root');
  
  Object.keys(newTheme).map(key => root.style.setProperty(key, newTheme[key]))
}
