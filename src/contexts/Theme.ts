import { createContext } from 'react';

// Types
import { ITheme } from 'interfaces';

const Theme = createContext<ITheme>({
  changeTheme: () => null,
});

export default Theme;
