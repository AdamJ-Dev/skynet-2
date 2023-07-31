import { getProviderError } from '../getProviderError.js';
import { EpgContext } from './provider.js';
import { useContext } from 'react';

export const useEpgContext = () => {
  const context = useContext(EpgContext);

  if (!context) {
    throw Error(getProviderError('EpgContext'));
  }

  return context;
};
