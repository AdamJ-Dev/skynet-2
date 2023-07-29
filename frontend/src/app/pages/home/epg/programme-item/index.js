import { calculateDurationInMinutes } from '../../../../../lib/calculateDuration';
import { parseClockInfo } from '../../../../../lib/parseClockInfo';
import { numHeaderRows } from '../utils/getGridInfo';

import styles from './index.module.css';

const ProgrammeItem = ({ programme }) => {
  const duration = calculateDurationInMinutes(new Date(programme.since), new Date(programme.till));
  const gridSlot = { gridColumn: `span ${duration}`, gridRow: numHeaderRows + parseInt(programme.channelId) };
  const startTime = parseClockInfo(new Date(programme.since));
  const endTime = parseClockInfo(new Date(programme.till));

  return (
    <div
      className={`${styles.programmeSlot} ${!!programme.location && styles.specialProgrammeSlot}`}
      style={gridSlot}
    >
      <div className={styles.programmeInfo}>
        <p>{programme.title}</p>
        <div>
          {startTime}-{endTime}
        </div>
      </div>
    </div>
  );
};

export default ProgrammeItem;
