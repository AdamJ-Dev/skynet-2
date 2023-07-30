import { useState } from 'react';
import { calculateDurationInMinutes } from '../../../../../lib/calculateDuration';
import { parseClockInfo } from '../../../../../lib/parseClockInfo';
import { numHeaderRows } from '../utils/getGridInfo';

import styles from './index.module.css';
import { getLocationEnticement, getProgrammePath } from '../../../../../config/pages/selectors';
import { Link } from 'react-router-dom';

const ProgrammeItem = ({ programme }) => {
  const [seeMore, setSeeMore] = useState(false);

  const duration = calculateDurationInMinutes(new Date(programme.since), new Date(programme.till));
  const gridSlot = { gridColumn: `span ${duration}`, gridRow: numHeaderRows + parseInt(programme.channelId) };
  const startTime = parseClockInfo(new Date(programme.since));
  const endTime = parseClockInfo(new Date(programme.till));

  return (
    <div
      className={`${styles.programmeSlot} ${!!programme.location && styles.specialProgrammeSlot}`}
      style={gridSlot}
      onClick={() => setSeeMore(!seeMore)}
    >
      <div className={styles.programmeInfo}>
        {seeMore ? (
          <>
            <p>{programme.description}</p>
            {!!programme.location && (
              <p>
                {getLocationEnticement(programme.location.name)}{' '}
                <Link to={getProgrammePath(programme.id)}>{programme.location.name}</Link>
              </p>
            )}
          </>
        ) : (
          <>
            <p>{programme.title}</p>
            <div>
              {startTime}-{endTime}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgrammeItem;
