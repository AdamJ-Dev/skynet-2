import { useContext } from 'react';
import { getProviderError } from '../getProviderError.js';
import { AuthContext } from './provider.js';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(getProviderError('AuthContext'));
  }

  return context;
};
