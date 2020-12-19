import { createContext } from 'react';

// Types
import { IAuth } from 'interfaces';

const Authorization = createContext<IAuth>({
  user: null,
  loading: true,
  logged: false,
  signIn: () => null,
  signOut: () => null,
});

export default Authorization;
