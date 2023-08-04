import { HashLink } from 'react-router-hash-link';
import styles from './index.module.css';
import { getFlightsApiDisclaimer, getFlightsInfoDescription } from '../../../../config/pages/selectors';
import { useJourneyContext } from '../../../context/journey/hook';
import DepartureAirportSettings from './departure-airport-settings';
import { useEffect } from 'react';
import { SET_DESTINATION } from '../../../context/journey/provider';
import FlightDateSettings from './date-settings';
import FlightsDisplay from './flights-display';
import { useWeatherContext } from '../../../context/weather/hook';
import { SET_WEATHER } from '../../../context/weather/provider';
import { getGetWeatherUrl } from '../../../../config/api/selectors';
import useFetch from '../../../hooks/useFetch';

const FlightsInfo = ({ destination }) => {
  const { dispatch: dispatchJourney } = useJourneyContext();
  const { dispatch: dispatchWeather } = useWeatherContext();
  const { data: weatherData, get: getWeather } = useFetch(
    getGetWeatherUrl({ lat: destination.lat, lon: destination.lon })
  );

  useEffect(() => {
    dispatchJourney({ type: SET_DESTINATION, payload: destination });
  }, []);

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (weatherData) {
      dispatchWeather({ type: SET_WEATHER, payload: weatherData });
    }
  }, [weatherData]);

  return (
    <>
      <div className={styles.flightsInfoContainer}>
        <div className={styles.flightsInfoHeader}>
          <h2>Flights Information</h2>
        </div>
        <p>
          {getFlightsInfoDescription(destination.name)}
          <HashLink smooth to="#disclaimer">
            *
          </HashLink>
        </p>
        <DepartureAirportSettings />
        <FlightDateSettings />
        <FlightsDisplay destination={destination} />
        <div className={styles.disclaimer} id="disclaimer">
          <HashLink to="#disclaimer">*</HashLink>
          {getFlightsApiDisclaimer()}&nbsp;
          <HashLink smooth to="#set-departure-airport">
            Back
          </HashLink>
        </div>
      </div>
    </>
  );
};

export default FlightsInfo;
