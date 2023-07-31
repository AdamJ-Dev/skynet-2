import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getGetEpgProgrammeUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';

import styles from './index.module.css';
import { useState } from 'react';
import { GeolocationContextProvider } from '../../context/geolocation/provider';
import FlightsTable from './flights-table';

const ProgrammePage = () => {
  const { id } = useParams();
  const {
    loading: programmeLoading,
    data: programme,
    error: programmeError,
  } = useFetch(getGetEpgProgrammeUrl(id));
  const [seekLocation, setSeekLocation] = useState(false);


  return (
    <>
      {programmeLoading && <p>{getLoadingMessage()}</p>}
      {programmeError && <p>{programmeError}</p>}
      {programme && (
        <>
          <h1>{programme.title}</h1>
          <p>{programme.description}</p>
          <h2>Highlighted Location: {programme.location.name}</h2>
          <div className={styles.locationInfo}>
            <div>{programme.location.relationship}</div>
            <div className={styles.map}>!!Map goes here!!</div>
          </div>
          <h3>Flights:</h3>
          <div>Click <button onClick={() => setSeekLocation(true)}>here</button> to find your nearest airport, and upcoming connecting flights to <em>{programme.location.name}'s</em> nearest airport.</div>
          {seekLocation && <GeolocationContextProvider><FlightsTable destination={{ latitude: programme.location.coordinates.lat, longitude: programme.location.coordinates.lon }}/></GeolocationContextProvider>}
        </>
      )}
    </>
  );
};

export default ProgrammePage;
