import { Link } from 'react-router-dom';
import { getProgrammePath } from '../../../../../config/pages/selectors';
import { formatAirTime } from '../utils/formatAirTime';
import { useEpgContext } from '../../../../context/epg/hook';
import { getLocation, hasLocation } from '../../../../utility/programmes/location';
import { channelColourStyle } from '../utils/channelColour';

const ProgrammeInfo = ({ programme, airingInfo }) => {
  const { channels } = useEpgContext();

  return (
    <div>
      <div>
        <p>
          <strong>Title:</strong>&nbsp;
          <>{programme.title}</>
        </p>
      </div>
      <div>
        <p>
          <strong>Description:</strong>&nbsp;
          <>{programme.description}</>
        </p>
      </div>
      <div>
        <p>
          <strong>Air times:</strong>&nbsp;
        </p>
        <ul>
          {airingInfo.map(({ since, till, channelId }) => {
            const channel = channels.find((channel) => channel.id === channelId);
            return (
              <li>
                <span style={channelColourStyle(channel)}>{channel.name}</span>: {formatAirTime(since, till)}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>
          <strong>Related Location:</strong>&nbsp;
          {hasLocation(programme) ? (
            <Link to={getProgrammePath(programme.id)}>{getLocation(programme).name}</Link>
          ) : (
            'N/A'
          )}
        </p>
      </div>
    </div>
  );
};

export default ProgrammeInfo;
