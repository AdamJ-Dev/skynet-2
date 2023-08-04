import { getProviderError } from '../getProviderError.js';
import { WeatherContext } from './provider.js';
import { useContext  } from 'react';

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
 
  if (!context) {
    throw Error(getProviderError('WeatherContext'));
  }

  return context;
};
