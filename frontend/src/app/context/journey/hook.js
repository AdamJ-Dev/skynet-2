import { useContext } from 'react';
import { getProviderError } from '../getProviderError.js';
import { JourneyContext } from './provider.js';

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw Error(getProviderError('JourneyContext'));
  }

  return context;
};
