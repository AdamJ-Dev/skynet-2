import { useContext } from 'react';
import { getProviderError } from '../get-provider-error.js';
import { EpgContext } from './provider.js';

export const useEpgContext = () => {
  const context = useContext(EpgContext);

  if (!context) {
    throw Error(getProviderError('EpgContext'));
  }

  return context;
};
