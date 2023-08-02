import { useCallback, useState } from 'react';
import {
  getGenericLocationErrorMessage,
  getLocationDeniedErrorMessage,
  getLocationTimeoutErrorMessage,
  getLocationUnavailableErrorMessage,
} from '../../config/messages/selectors';

const defaultGeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const useLocate = (geolocationOptions = defaultGeolocationOptions) => {
  const [location, setLocation] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(null);

  const locate = useCallback(() => {
    if (navigator.geolocation) {
      setWaiting(true);
      navigator.geolocation.getCurrentPosition(
        geolocationSuccessCallback,
        geolocationErrorCallback,
        geolocationOptions
      );
    } else {
      setError(getGenericLocationErrorMessage());
    }
  }, [geolocationOptions]);

  const geolocationSuccessCallback = useCallback((position) => {
    const { latitude, longitude } = position.coords;
    setWaiting(false);
    setLocation({ lat: latitude, lon: longitude });
  }, []);

  const geolocationErrorCallback = useCallback((error) => {
    setWaiting(false);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError(getLocationDeniedErrorMessage());
        break;
      case error.POSITION_UNAVAILABLE:
        setError(getLocationUnavailableErrorMessage());
        break;
      case error.TIMEOUT:
        setError(getLocationTimeoutErrorMessage());
        break;
      default:
        console.log(getGenericLocationErrorMessage());
        break;
    }
  }, []);

  return { location, waiting, error, locate };
};

export default useLocate;
