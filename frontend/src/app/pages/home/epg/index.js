import { useEffect } from 'react';
import {
  getGetEpgChannelsUrl,
  getGetEpgProgrammesUrl,
} from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import { SET_CHANNELS, SET_PROGRAMMES } from '../../../context/epg/provider';
import { useEpgContext } from '../../../context/epg/hook';
import useFetch from '../../../hooks/useFetch';
import { getGridSpec } from './utils/getGridSpec';
import { initialiseCssGrid } from './utils/initialiseCssGrid';
import EpgSearchBar from './search-bar';
import ProgrammeItem from './programme-item';
import ChannelItem from './channel-item';
import styles from './index.module.css';

const Epg = () => {
  const {
    loading: channelsLoading,
    data: channelsData,
    error: channelsError,
    get: getChannels,
  } = useFetch(getGetEpgChannelsUrl());
  const {
    loading: programmesLoading,
    data: programmesData,
    error: programmesError,
    get: getProgrammes,
  } = useFetch(getGetEpgProgrammesUrl());
  const { dispatch, programmes, channels } = useEpgContext();

  useEffect(() => {
    getProgrammes();
    getChannels();
  }, []);

  useEffect(() => {
    if (programmesData) {
      dispatch({ type: SET_PROGRAMMES, payload: programmesData });
    }
  }, [programmesData]);

  useEffect(() => {
    if (channelsData) {
      dispatch({ type: SET_CHANNELS, payload: channelsData });
    }
  }, [channelsData]);

  return (
    <>
      {(channelsLoading || programmesLoading) && <p>{getLoadingMessage()}</p>}
      {(channelsError || programmesError) && <p>{channelsError || programmesError}</p>}
      {!!channels.length && !!programmes.length && (
        <div className={styles.epg} style={initialiseCssGrid(channels, programmes)}>
          <div className={styles.searchBarRow}>
            <EpgSearchBar programmes={programmes} />
          </div>
          {getGridSpec(channels, programmes).map((spec) =>
            spec.channel ? (
              <ChannelItem channel={spec.channel} />
            ) : (
              <ProgrammeItem programme={spec.programme} />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Epg;
