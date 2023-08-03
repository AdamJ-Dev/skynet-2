import { Link } from 'react-router-dom';
import { getProgrammePath } from '../../../../../config/pages/selectors';
import { formatAirTime } from '../utils/formatAirTime';
import { useEpgContext } from '../../../../context/epg/hook';

const ProgrammeInfo = ({ programme, airingInfo }) => {
  const { channels } = useEpgContext();

  return (
    <>
      <p>
        <strong>Title:</strong> {programme.title}
      </p>
      <p>
        <strong>Description:</strong> {programme.description}
      </p>
      <p>
        <strong>Air times:</strong>{' '}
      </p>
      <ul>
        {airingInfo.map(({ since, till, channelId }) => {
          const channel = channels.find((channel) => channel.id == channelId);
          return (
            <li>
              <span style={{ color: channel.colour }}>{channel.name}</span>: {formatAirTime(since, till)}
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Related Location:</strong>{' '}
        {!!programme.locations.length ? (
          <Link to={getProgrammePath(programme.id)}>{programme.locations[0]}</Link>
        ) : (
          'N/A'
        )}
      </p>
    </>
  );
};

export default ProgrammeInfo;
