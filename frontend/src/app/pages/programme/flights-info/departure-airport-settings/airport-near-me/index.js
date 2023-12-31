import { useCallback, useEffect, useState } from 'react';
import { getGetNearestAirportUrl } from '../../../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../../../config/messages/selectors';
import { getGetAiportsNearMeMessage } from '../../../../../../config/pages/selectors';
import { nearestAiportErrorParser } from '../../../../../utility/error-handling/nearest-airport-error-parser';
import { formatAirportName } from '../utils/format-airport-name';
import { SET_DEPARTURE_AIRPORT } from '../../../../../context/journey/provider';
import { useJourneyContext } from '../../../../../context/journey/hook';
import useLocate from '../../../../../hooks/use-locate';
import useFetch from '../../../../../hooks/use-fetch';
import styles from './index.module.css';

const AirportNearMe = () => {
  const {
    location: locationData,
    waiting: locationWaiting,
    error: locationError,
    locate,
  } = useLocate();
  const {
    loading: nearestAirportLoading,
    data: nearestAirportData,
    error: nearestAirportError,
    get: getNearestAirport,
  } = useFetch();
  const { dispatch } = useJourneyContext();

  const [result, setResult] = useState(null);

  const triggerAirportSearch = useCallback(() => {
    locate();
  }, [locate]);

  const handleSelectAirport = useCallback(
    (airport) => {
      dispatch({ type: SET_DEPARTURE_AIRPORT, payload: airport });
      setResult(null);
    },
    [dispatch]
  );

  useEffect(() => {
    if (locationData) {
      getNearestAirport({
        url: getGetNearestAirportUrl(locationData.lat, locationData.lon),
        errorParser: nearestAiportErrorParser,
      });
    }
  }, [locationData, getNearestAirport]);

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
      setResult(formatAirportName(nearestAirportData));
    }
  }, [nearestAirportData]);

  useEffect(() => {
    if (locationWaiting || nearestAirportLoading) {
      setResult(getLoadingMessage());
    }
  }, [locationWaiting, nearestAirportLoading]);

  return (
    <div className={styles.airportNearMeContainer}>
      <button onClick={triggerAirportSearch}>Go</button>
      &nbsp;
      <span className={styles.getAirportNearMeMsg}>{getGetAiportsNearMeMessage()}</span>
      {result && (
        <span className={styles.resultContainer}>
          &nbsp;-&gt;&nbsp;
          {nearestAirportData && result === formatAirportName(nearestAirportData) ? (
            <span>
              Select&nbsp;
              <button
                className={styles.nearestAirportBtn}
                onClick={() => handleSelectAirport(nearestAirportData)}
              >
                {result}
              </button>
              ?
            </span>
          ) : (
            result
          )}
        </span>
      )}
    </div>
  );
};

export default AirportNearMe;
