import { getProviderError } from '../getProviderError.js';
import { ProfileContext } from './provider.js';
import { useContext  } from 'react';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
 
  if (!context) {
    throw Error(getProviderError('ProfileContext'));
  }

  return context;
};
