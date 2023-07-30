import { useGeolocationContext } from '../../../context/geolocation/hook';

import styles from './index.module.css';

const FlightsTable = ({ destination }) => {
  const { location: source, waiting, error } = useGeolocationContext();
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
        <td>
          {waiting && "Waiting for location info ..."}
          {source ? `Airport closest to lat: ${source.latitude}, lon: ${source.longitude}` : error}</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
        <td>Blah</td>
      </tbody>
    </table>
  );
};

export default FlightsTable;
