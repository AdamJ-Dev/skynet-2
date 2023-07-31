import { useState } from 'react';
import { channelsColumnTrack, numHeaderRows } from '../utils/getGridInfo';

import styles from './index.module.css';

const ChannelItem = ({ channel }) => {
  const [seeMore, setSeeMore] = useState(false);

  const gridSlot = {
    gridColumn: `span ${channelsColumnTrack}`,
    gridRow: numHeaderRows + parseInt(channel.id),
  };
  return (
    <div style={gridSlot} className={styles.channelSlot} onClick={() => setSeeMore(!seeMore)}>
      <div className={styles.channelInfo}>
        {seeMore ? <p>{channel.description}</p> : <h4 style={{ color: channel.colour }}>{channel.name}</h4>}
      </div>
    </div>
  );
};

export default ChannelItem;
