import { getProviderError } from '../getProviderError.js';
import { GeolocationContext, SET_LOCATION, SET_LOCATION_ERROR } from './provider.js';
import { useContext, useEffect } from 'react';

const defaultGeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const useGeolocationContext = (geolocationOptions = defaultGeolocationOptions) => {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw Error(getProviderError('GeolocationContext'));
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          context.dispatch({ type: SET_LOCATION, payload: { latitude, longitude }})
        },
        () => {
          context.dispatch({ type: SET_LOCATION_ERROR });
        },
        geolocationOptions
      );
    } else {
      context.dispatch({ type: SET_LOCATION_ERROR });
    }
  }, [])

  return context;
};
