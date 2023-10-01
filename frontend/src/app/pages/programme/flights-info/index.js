import { HashLink } from 'react-router-hash-link';
import { useEffect } from 'react';
import {
  getFlightsApiDisclaimer,
  getFlightsInfoDescription,
} from '../../../../config/pages/selectors';
import { useJourneyContext } from '../../../context/journey/hook';
import { SET_DESTINATION } from '../../../context/journey/provider';
import { hashtag } from '../../../../lib/web/hashtag';
import styles from './index.module.css';
import DepartureAirportSettings from './departure-airport-settings';
import FlightDateSettings from './date-settings';
import FlightsDisplay from './flights-display';

const DESCRIPTION_ID = 'flights-description';
const DISCLAIMER_ID = 'flights-disclaimer';

const FlightsInfo = ({ destination }) => {
  const { dispatch: dispatchJourney } = useJourneyContext();

  useEffect(() => {
    dispatchJourney({ type: SET_DESTINATION, payload: destination });
  }, [dispatchJourney, destination]);

  return (
    <>
      <div className={styles.flightsInfoContainer}>
        <div className={styles.flightsInfoHeader}>
          <h2>Flights Information</h2>
        </div>
        <p id={DESCRIPTION_ID}>
          {getFlightsInfoDescription(destination.name)}
          <HashLink smooth to={hashtag(DISCLAIMER_ID)}>
            *
          </HashLink>
        </p>
        <DepartureAirportSettings />
        <FlightDateSettings />
        <FlightsDisplay destination={destination} />
        <div className={styles.disclaimer} id={DISCLAIMER_ID}>
          <HashLink to={hashtag(DISCLAIMER_ID)}>*</HashLink>
          {getFlightsApiDisclaimer()}&nbsp;
          <HashLink smooth to={hashtag(DESCRIPTION_ID)}>
            Back
          </HashLink>
        </div>
      </div>
    </>
  );
};

export default FlightsInfo;
