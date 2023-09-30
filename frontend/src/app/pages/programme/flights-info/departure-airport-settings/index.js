import { useState } from 'react';
import { formatAirportName } from './utils/formatAirportName';
import { useJourneyContext } from '../../../../context/journey/hook';
import AirportsSearchBar from './search-bar';
import AirportNearMe from './airport-near-me';
import Toggler from '../../../../components/toggler';
import styles from './index.module.css';

const airportSelectionMethods = {
  search: 'Search',
  nearby: 'Get near me',
};

const DepartureAirportSettings = () => {
  const { departureAirport } = useJourneyContext();
  const [selectionMethod, setSelectionMethod] = useState(airportSelectionMethods.search);

  return (
    <div className={styles.setDepartureAirport}>
      <h4>Departure Airport</h4>
      <Toggler
        option1={airportSelectionMethods.search}
        option2={airportSelectionMethods.nearby}
        activeOption={selectionMethod}
        setActiveOption={setSelectionMethod}
      />
      <div className={styles.findDepartureAirport}>
        {selectionMethod === airportSelectionMethods.search ? <AirportsSearchBar /> : <AirportNearMe />}
      </div>
      <p>Departing from {departureAirport ? formatAirportName(departureAirport) : '...'}</p>
    </div>
  );
};

export default DepartureAirportSettings;
