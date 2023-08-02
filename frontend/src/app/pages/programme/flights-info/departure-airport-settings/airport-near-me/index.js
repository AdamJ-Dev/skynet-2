import { useEffect, useState } from 'react';
import useLocate from '../../../../../hooks/useLocate';
import useFetch from '../../../../../hooks/useFetch';
import { getGetNearestAirportUrl } from '../../../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../../../config/messages/selectors';

import styles from './index.module.css';
import { getGetAiportsNearMeMessage } from '../../../../../../config/pages/selectors';
import { formatAirportName } from '../utils/formatAirportName';
import { useJourneyContext } from '../../../../../context/journey/hook';
import { SET_DEPARTURE_AIRPORT } from '../../../../../context/journey/provider';

const AirportNearMe = () => {
  const { location: locationData, waiting: locationWaiting, error: locationError, locate } = useLocate();
  const {
    loading: nearestAirportLoading,
    data: nearestAirportData,
    error: nearestAirportError,
    get,
  } = useFetch('');
  const [result, setResult] = useState(null);
  const { dispatch } = useJourneyContext();

  useEffect(() => {
    if (locationData) {
      get({ url: getGetNearestAirportUrl(locationData.lat, locationData.lon) });
    }
  }, [locationData]);

  useEffect(() => {
    if (locationError) {
      setResult(locationError);
    }
  }, [locationError]);

  useEffect(() => {
    if (nearestAirportError) {
      setResult(nearestAirportError);
    }
  }, [nearestAirportError]);

  useEffect(() => {
    if (nearestAirportData) {
      console.log(nearestAirportData);
      setResult(formatAirportName(nearestAirportData));
    }
  }, [nearestAirportData]);

  useEffect(() => {
    if (locationWaiting || nearestAirportLoading) {
      setResult(getLoadingMessage());
    }
  }, [locationWaiting, nearestAirportLoading]);

  const triggerAirportSearch = () => {
    locate();
  };

  const handleSelectAirport = (airport) => {
    dispatch({ type: SET_DEPARTURE_AIRPORT, payload: airport });
    setResult(null);
  };

  return (
    <div className={styles.airportNearMeContainer}>
      <button onClick={() => triggerAirportSearch()}>Go</button>
      &nbsp;
      <span className={styles.getAirportNearMeMsg}>{getGetAiportsNearMeMessage()}</span>
      {result && (
        <span className={styles.resultContainer}>
          &nbsp;-&gt;{' '}
          {nearestAirportData && result == formatAirportName(nearestAirportData) ? (
            <span>
              Select{' '}
              <button className={styles.nearestAirportBtn} onClick={() => handleSelectAirport(nearestAirportData)}>
                {result}
              </button>
              ?
            </span>
          ) : (
            result
          )}
        </span>
      )}
      {/* <div>Result: </div> */}
    </div>
  );
};

export default AirportNearMe;
