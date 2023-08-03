import { getDepartureAirportInstructions } from '../../../../../config/pages/selectors';
import AirportsSearchBar from './search-bar';
import styles from './index.module.css';
import AirportNearMe from './airport-near-me';
import Toggler from '../../../../components/toggler';
import { useState } from 'react';
import { useJourneyContext } from '../../../../context/journey/hook';
import { formatAirportName } from './utils/formatAirportName';

const airportSelectionMethods = {
  search: 'Search',
  nearby: 'Get near me',
};

const DepartureAirportSettings = () => {
  const [airportSelectionMethod, setAirportSelectionMethod] = useState(airportSelectionMethods.search);
  const { departureAirport } = useJourneyContext();

  return (
    <div id="set-departure-airport" className={styles.setDepartureAirport}>
      <h4>Departure Airport</h4>
      {/* <div>{getDepartureAirportInstructions()}</div> */}
      <Toggler
        option1="Search"
        option2="Get near me"
        activeOption={airportSelectionMethod}
        setActiveOption={setAirportSelectionMethod}
      />
      <div className={styles.findDepartureAirport}>
        {airportSelectionMethod === airportSelectionMethods.search ? (
          <AirportsSearchBar />
        ) : (
          <AirportNearMe />
        )}
      </div>
      <p>Departing from {departureAirport ? formatAirportName(departureAirport) : '...'}</p>
    </div>
  );
};

export default DepartureAirportSettings;
