import MapImage from '../../../components/map-image';
import { getLocation } from '../../../utility/programmes/location';

import styles from './index.module.css';

const ProgrammeLocationIntro = ({ programme }) => {
  const { title, description } = programme;
  const {
    name: locationName,
    lat: locationLat,
    lon: locationLon,
    relationship: locationRelationship,
  } = getLocation(programme);

  return (
    <div className={styles.programmeLocationIntro}>
      <MapImage lat={locationLat} lon={locationLon} locationName={locationName} />
      <div>
        <h1>{title}</h1>
        <div className={styles.snippetText}>
          <p>{description}</p>
        </div>
        <h2>
          Highlighted Location:&nbsp;
          <><em>{locationName}</em></>
        </h2>
        <div className={styles.snippetText}>
          <p>{locationRelationship}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeLocationIntro;
