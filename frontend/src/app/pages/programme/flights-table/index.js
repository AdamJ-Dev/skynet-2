import { useEffect } from 'react';
import { getGetWeatherUrl } from '../../../../config/api/selectors';
import { getGenericErrorMessage, getLoadingMessage } from '../../../../config/messages/selectors';
import { useGeolocationContext } from '../../../context/geolocation/hook';
import useFetch from '../../../hooks/useFetch';

import styles from './index.module.css';

const FlightsTable = ({ destination }) => {
  const { location: source, waiting, error } = useGeolocationContext();
  const {
    loading: weatherLoading,
    data: weatherData,
    error: weatherError,
  } = useFetch(getGetWeatherUrl({ lat: destination.latitude, lon: destination.longitude, days: 1 }));

  return (
    <table className={styles.flightsTable}>
      <thead>
        <tr>
          <td>Departure Airport</td>
          <td>Arrival airport</td>
          <td>Departure Time</td>
          <td>Arrival Time</td>
          <td>Duration</td>
          <td>Price</td>
          <td>Number of Changes</td>
          <td>Weather on Arrival</td>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>
          {waiting && 'Waiting for location info ...'}
          {source ? `Airport closest to lat: ${source.latitude}, lon: ${source.longitude}` : error}
        </td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>
          {weatherLoading && <p>{getLoadingMessage()}</p>}
          {weatherError && <p>{getGenericErrorMessage()}</p>}
          {weatherData && <p>{weatherData[0].desc}</p>}
          </td>
        </tr>
       
      </tbody>
    </table>
  );
};

export default FlightsTable;
