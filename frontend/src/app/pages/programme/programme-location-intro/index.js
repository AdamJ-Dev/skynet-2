import MapImage from '../../../components/map-image';

import styles from './index.module.css';

const ProgrammeLocationIntro = ({ programme }) => {
  const {
    title,
    description,
    location: {
      name: locationName,
      coordinates: { lat, lon },
      relationship: locationRelationship,
    },
  } = programme;
  return (
    <div className={styles.programmeLocationIntro}>
      <MapImage lat={lat} lon={lon} locationName={locationName} />
      <div>
        <h1>{title}</h1>
        <div className={styles.snippetText}>
          <p>{description}</p>
        </div>
        <h2>
          Highlighted Location: <em>{locationName}</em>
        </h2>
        <div className={styles.snippetText}>
          <p>{locationRelationship}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeLocationIntro;
