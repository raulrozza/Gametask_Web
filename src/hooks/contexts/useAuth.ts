import { useContext } from 'react';

// Contexts
import { AuthorizationContext } from 'contexts';

// Types
import { IAuth } from 'interfaces';

export function useAuth(): IAuth {
  const auth = useContext(AuthorizationContext);

  return auth;
}
