import { getGetEpgChannelsUrl, getGetEpgProgrammesUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import useFetch from '../../../hooks/useFetch';
import { initialiseCssGrid } from './utils/initialiseCssGrid';
import SearchBar from './search-bar';
import ProgrammeItem from './programme-item';

import styles from './index.module.css';
import ChannelItem from './channel-item';
import { useEpgContext } from '../../../context/epg/hook';
import { useEffect } from 'react';
import { SET_CHANNELS, SET_PROGRAMMES } from '../../../context/epg/provider';

const Epg = () => {
  const { loading: channelsLoading, data: channelsData, error: channelsError } = useFetch(getGetEpgChannelsUrl());
  const {
    loading: programmesLoading,
    data: programmesData,
    erro: programmesError,
  } = useFetch(getGetEpgProgrammesUrl());
  const { dispatch, programmes, channels } = useEpgContext();


  useEffect(() => {
    if (programmesData) {
      dispatch({ type: SET_PROGRAMMES, payload: programmesData });
    }
  }, [programmesData])

  useEffect(() => {
    if (channelsData) {
      dispatch({ type: SET_CHANNELS, payload: channelsData });
    }
  }, [channelsData])


  const getGridItems = (channels, programmes) => {
    const gridItems = [];
    for (let channelNo = 1; channelNo <= channels.length; channelNo++) {
      const channel = channels.find((channel) => channel.id == channelNo);
      gridItems.push(<ChannelItem channel={channel} />);

      const channelProgrammes = programmes.filter((programme) => programme.channelId == channelNo);
      const orderedChannelProgrammes = channelProgrammes.sort(
        (programmeA, programmeB) => new Date(programmeA.since) - new Date(programmeB.since)
      );

      for (const programme of orderedChannelProgrammes) {
        gridItems.push(<ProgrammeItem programme={programme} />);
      }
    }
    return gridItems;
  };

  return (
    <>
      {(channelsLoading || programmesLoading) && <p>{getLoadingMessage()}</p>}
      {(channelsError || programmesError) && <p>{channelsError || programmesError}</p>}
      {!!channels.length && !!programmes.length && (
        <div className={styles.epg} style={initialiseCssGrid(channels, programmes)}>
          <div className={styles.searchBarRow}>
            <SearchBar programmes={programmes}/>
          </div>
          {getGridItems(channels, programmes)}
        </div>
      )}
    </>
  );
};

export default Epg;
