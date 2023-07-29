import { channelsColumnTrack, numHeaderRows } from "../utils/getGridInfo";

const ChannelItem = ({ channel }) => {
  return (
    <>
      <div style={{ gridColumn: `span ${channelsColumnTrack}`, gridRow: numHeaderRows + parseInt(channel.id) }}>{channel.name}</div>
    </>
  );
};

export default ChannelItem;
