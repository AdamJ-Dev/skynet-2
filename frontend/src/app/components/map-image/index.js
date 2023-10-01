import { useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';
import { getGetMapUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';
import { getImageSrc } from './utils/get-image-src';

import styles from './index.module.css';

const MapImage = ({ lat, lon, locationName }) => {
  const {
    loading,
    data: mapData,
    error,
    get: getMapImageData,
  } = useFetch(getGetMapUrl(lat, lon));

  useEffect(() => {
    getMapImageData();
  }, [getMapImageData]);

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
