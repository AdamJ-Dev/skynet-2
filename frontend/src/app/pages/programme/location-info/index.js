import { useEffect } from 'react';
import { getGetMapUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import useFetch from '../../../hooks/useFetch';

import styles from './index.module.css';
import MapImage from '../../../components/map-image';

const mapOptions = {
  zoom: 10, // large roads
  width: 320, // min size viewport support
  height: 320,
};

const LocationInfo = ({ location }) => {
  const { name, relationship, coordinates } = location;
  return (
    <>
      <h2>Highlighted Location: {location.name}</h2>
      <div className={styles.locationInfo}>
        <MapImage lat={coordinates.lat} lon={coordinates.lon} locationName={name} />
        <div>{relationship}</div>
      </div>
    </>
  );
};

export default LocationInfo;
