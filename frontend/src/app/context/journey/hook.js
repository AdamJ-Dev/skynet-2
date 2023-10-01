import { useContext } from 'react';
import { getProviderError } from '../get-provider-error.js';
import { JourneyContext } from './provider.js';

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw Error(getProviderError('JourneyContext'));
  }

  return context;
};
