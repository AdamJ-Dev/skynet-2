import { getGetEpgChannelsUrl, getGetEpgProgrammesUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import useFetch from '../../../hooks/useFetch';
import { initialiseCssGrid } from './utils/initialiseCssGrid';
import { getGridItems } from './utils/getGridItems';

const Epg = () => {
  const { loading: channelsLoading, data: channels, error: channelsError } = useFetch(getGetEpgChannelsUrl());
  const {
    loading: programmesLoading,
    data: programmes,
    erro: programmesError,
  } = useFetch(getGetEpgProgrammesUrl());

  return (
    <>
      {(channelsLoading || programmesLoading) && <p>{getLoadingMessage()}</p>}
      {(channelsError || programmesError) && <p>{channelsError || programmesError}</p>}
      {!!channels && !!programmes && <div style={initialiseCssGrid(channels, programmes)}>
        {getGridItems(channels, programmes)}
        </div>}
    </>
  );
};

export default Epg;
