interface PaletteOptions {
  light: string;
  main: string;
  dark: string;
  contrast: string;
}

type PaletteKeys = 'primary' | 'secondary';

const palette: Record<PaletteKeys, PaletteOptions> = {
  primary: {
    light: '#FFFFFF',
    main: '#FFFFFF',
    dark: '#cccccc',
    contrast: '#1F1F1F',
  },
  secondary: {
    light: '#c651bf',
    main: '#852c80',
    dark: '#381336',
    contrast: '#F5F5F5',
  },
};

export default palette;
