import { useEffect } from 'react';
import { getImageSrc } from './utils/getImageSrc';
import useFetch from '../../hooks/useFetch';
import { getGetMapUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';


const MapImage = ({ lat, lon, locationName} ) => {
  const {
    loading,
    data: mapData,
    error,
    get: getMapImageData,
  } = useFetch(getGetMapUrl(lat, lon));

  useEffect(() => {
    getMapImageData();
  }, []);

  return (
    <div>
      {loading && getLoadingMessage()}
      {error && <div>{error}</div>}
      {mapData && <img src={getImageSrc(mapData.imageData)} alt={`Map of ${locationName}`} />}
    </div>
  );
};

export default MapImage;
