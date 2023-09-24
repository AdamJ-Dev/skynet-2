import { useState } from 'react';
import { channelsColumnTrack, getRow, spanColumns } from '../utils/getGridInfo';
import { channelColourStyle } from '../utils/channelColour';
import styles from './index.module.css';

const ChannelItem = ({ channel }) => {
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const gridSlot = {
    gridColumn: spanColumns(channelsColumnTrack),
    gridRow: getRow(channel.id),
  };

  return (
    <div style={gridSlot} className={styles.channelSlot} onClick={toggleSeeMore}>
      <div className={styles.channelInfo}>
        {seeMore ? <p>{channel.description}</p> : <h4 style={channelColourStyle(channel)}>{channel.name}</h4>}
      </div>
    </div>
  );
};

export default ChannelItem;
