import { getGetEpgChannelsUrl, getGetEpgProgrammesUrl } from "../../../../config/api/selectors";
import { getLoadingMessage } from "../../../../config/messages/selectors";
import useFetch from "../../../hooks/useFetch";

const Epg = () => {
  const { loading: channelsLoading, data: channels, error: channelsError } = useFetch(getGetEpgChannelsUrl());
  const { loading: programmesLoading , data: programmes, erro: programmesError } = useFetch(getGetEpgProgrammesUrl());

  return (
    <div>
      <h1>Channels are:</h1>
      {channelsLoading && <p>{getLoadingMessage()}</p>}
      {channels && <ul>{channels.map(channel => <li>{channel.name}</li>)}</ul>}
      {channelsError && <p>{channelsError}</p>}

      <h1>Programmes are:</h1>
      {programmesLoading && <p>{getLoadingMessage()}</p>}
      {programmes && <ul>{programmes.map(programme => <li>{programme.title}</li>)}</ul>}
      {programmesError && <p>{programmesError}</p>}
    </div>
  );
}
 
export default Epg;