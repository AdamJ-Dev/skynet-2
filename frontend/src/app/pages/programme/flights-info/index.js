import { useState } from 'react';
import { GeolocationContextProvider } from '../../../context/geolocation/provider';
import FlightsTable from './flights-table';
import { HashLink } from 'react-router-hash-link';
import styles from './index.module.css';
import {
  getFlightsApiDisclaimer,
  getFlightsInfoDescription,
} from '../../../../config/pages/selectors';
import AirportsSearchBar from './search-bar';

const FlightsInfo = ({ destination }) => {
  const [departureAirportCode, setDepartureAirportCode] = useState(null);
  const [seekLocation, setSeekLocation] = useState(false);
  return (
    <div className={styles.flightsInfoContainer}>
      <h2>Flights Information</h2>
      <div className="departureAirport">
        <p>
          {getFlightsInfoDescription(destination.name)}
          <HashLink smooth to="#disclaimer">*</HashLink>
        </p>
        <AirportsSearchBar setDepartureAirportCode={setDepartureAirportCode} />
        <div>Click here to find your nearest airport</div>
        <p>Departing from ...</p>
      </div>
      <div>Departure date: ... Return date: ...</div>
      {seekLocation && (
        <GeolocationContextProvider>
          <FlightsTable
            destination={{
              latitude: destination.coordinates.lat,
              longitude: destination.coordinates.lon,
            }}
          />
        </GeolocationContextProvider>
      )}
      <div id="disclaimer">
        <HashLink to="#disclaimer">*</HashLink>
        {getFlightsApiDisclaimer()}
        <HashLink smooth to="#departureAirport">Back</HashLink>
      </div>
    </div>
  );
};

export default FlightsInfo;
