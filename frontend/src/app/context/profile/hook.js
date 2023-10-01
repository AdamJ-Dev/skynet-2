import { useContext } from 'react';
import { getProviderError } from '../get-provider-error.js';
import { ProfileContext } from './provider.js';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw Error(getProviderError('ProfileContext'));
  }

  return context;
};
