import { channelsColumnTrack, numHeaderRows } from '../utils/getGridInfo';

import styles from './index.module.css';

const ChannelItem = ({ channel }) => {
  const gridSlot = {
    gridColumn: `span ${channelsColumnTrack}`,
    gridRow: numHeaderRows + parseInt(channel.id),
  };
  return (
    <div style={gridSlot} className={styles.channelSlot}>
      <div className={styles.channelInfo}>
        <h4 style={{ color: channel.colour }}>{channel.name}</h4>
      </div>
    </div>
  );
};

export default ChannelItem;
