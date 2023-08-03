import { getProviderError } from '../getProviderError.js';
import { JourneyContext } from './provider.js';
import { useContext  } from 'react';

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);
 
  if (!context) {
    throw Error(getProviderError('JourneyContext'));
  }

  return context;
};
