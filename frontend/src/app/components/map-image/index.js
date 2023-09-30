import { useEffect } from 'react';
import { getImageSrc } from './utils/getImageSrc';
import useFetch from '../../hooks/useFetch';
import { getGetMapUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';

import styles from './index.module.css';

const MapImage = ({ lat, lon, locationName }) => {
  const { loading, data: mapData, error, get: getMapImageData } = useFetch(getGetMapUrl(lat, lon));

  useEffect(() => {
    getMapImageData();
  }, []);

  return (
    <>
      {loading && <div>{getLoadingMessage()}</div>}
      {error && <div>{error}</div>}
      {mapData && (
        <img
          className={styles.mapImage}
          src={getImageSrc(mapData.imageData)}
          alt={`Map of ${locationName}`}
        />
      )}
    </>
  );
};

export default MapImage;
