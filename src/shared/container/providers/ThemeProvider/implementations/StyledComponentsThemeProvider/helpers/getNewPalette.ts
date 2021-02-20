import tinyColor from 'tinycolor2';
import { DefaultTheme } from 'styled-components';

import { ISwitchThemeArgs } from 'shared/container/providers/ThemeProvider/models/IThemeProvider';

type Palette = DefaultTheme['palette'];

const textContrasts = {
  light: '#1F1F1F',
  dark: '#F5F5F5',
};

const getPaletteRangeFromColor = (color: string): Palette['primary'] => {
  const colorObject = tinyColor(color);

  return {
    light: colorObject.isLight()
      ? tinyColor(color).lighten(20).toHexString()
      : tinyColor(color).darken(20).toHexString(),
    main: colorObject.toHexString(),
    contrast: colorObject.isLight() ? textContrasts.light : textContrasts.dark,
    dark: colorObject.isLight()
      ? tinyColor(color).darken(20).toHexString()
      : tinyColor(color).lighten(20).toHexString(),
  };
};

export default function getNewPalette(theme: ISwitchThemeArgs): Palette {
  const primary = getPaletteRangeFromColor(theme.primary);
  const secondary = getPaletteRangeFromColor(theme.secondary);

  return {
    primary,
    secondary,
  };
}
