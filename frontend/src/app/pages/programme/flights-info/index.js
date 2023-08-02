import FlightsTable from './flights-table';
import { HashLink } from 'react-router-hash-link';
import styles from './index.module.css';
import { getFlightsApiDisclaimer, getFlightsInfoDescription } from '../../../../config/pages/selectors';
import { useJourneyContext } from '../../../context/journey/hook';
import DepartureAirportSettings from './departure-airport-settings';
import { useEffect } from 'react';
import { SET_DESTINATION } from '../../../context/journey/provider';
import FlightDateSettings from './date-settings';

const FlightsInfo = ({ destination }) => {
  const { dispatch } = useJourneyContext();

  useEffect(() => {
    dispatch({ type: SET_DESTINATION, payload: destination });
  }, []);

  return (
    <>
      <div className={styles.flightsInfoContainer}>
        <h2>Flights Information</h2>
        <p>
          {getFlightsInfoDescription(destination.name)}
          <HashLink smooth to="#disclaimer">
            *
          </HashLink>
        </p>
        <DepartureAirportSettings />
        <FlightDateSettings />
        <FlightsTable destination={destination} />
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
