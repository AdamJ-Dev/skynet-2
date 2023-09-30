import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getLocationEnticement,
  getProgrammePath,
} from '../../../../../config/pages/selectors';
import { calculateDurationInMinutes } from '../../../../../lib/date/calculateDurationInMinutes';
import { gatherClasses, optionalClass } from '../../../../../lib/web/cssClasses';
import { getLocation, hasLocation } from '../../../../utility/programmes/location';
import { getRow, spanColumns } from '../utils/getGridInfo';
import { formatAirTime } from '../utils/formatAirTime';
import styles from './index.module.css';

const ProgrammeItem = ({ programme }) => {
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const duration = calculateDurationInMinutes(
    new Date(programme.since),
    new Date(programme.till)
  );
  const gridSlot = {
    gridColumn: spanColumns(duration),
    gridRow: getRow(programme.channelId),
  };

  return (
    <div
      className={gatherClasses(
        styles.programmeSlot,
        optionalClass(styles.specialProgrammeSlot, hasLocation(programme))
      )}
      style={gridSlot}
      onClick={toggleSeeMore}
    >
      <div className={styles.programmeInfo}>
        {seeMore ? (
          <>
            <p>{programme.description}</p>
            {hasLocation(programme) && (
              <p>
                {getLocationEnticement(getLocation(programme).name)}{' '}
                <Link to={getProgrammePath(programme.id)}>
                  {getLocation(programme).name}
                </Link>
              </p>
            )}
          </>
        ) : (
          <>
            <p>{programme.title}</p>
            <div>{formatAirTime(programme.since, programme.till)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgrammeItem;
