import { getProviderError } from '../getProviderError.js';
import { AuthContext } from './provider.js';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(getProviderError('AuthContext'));
  }

  return context;
};
