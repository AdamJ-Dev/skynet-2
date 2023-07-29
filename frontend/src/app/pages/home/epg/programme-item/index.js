import { calculateDurationInMinutes } from "../../../../../lib/calculateDuration";
import { numHeaderRows } from "../utils/getGridInfo";

const ProgrammeItem = ({ programme }) => {
  const duration = calculateDurationInMinutes(new Date(programme.since), new Date(programme.till));

  return (
  <>
    <div style={{ gridColumn: `span ${duration}`, gridRow: numHeaderRows + parseInt(programme.channelId)}}>{programme.title}</div>
  </>
  );
}
 
export default ProgrammeItem;