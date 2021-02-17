type Space = number | string;

interface Spacing {
  (value: Space): string;
  (vertical: Space, horizontal: Space): string;
  (top: Space, horizontal: Space, bottom: Space): string;
  (top: Space, right: Space, bottom: Space, left: Space): string;
}

const valueToString = (value: Space): string => {
  if (typeof value === 'string') return value;
  return `${value}px`;
};

const spacing: Spacing = (...args: Space[]) => {
  const argsToString = args.map(arg => valueToString(arg));
  const spacingString = argsToString.join(' ');

  return spacingString;
};

const layout = {
  spacing,
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export default layout;
