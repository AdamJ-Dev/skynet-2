import { calculateDurationInMinutes } from '../../../../../lib/calculateDuration';

export const getGridItems = (channels, programmes) => {
  const gridItems = [];
  for (let channelNo = 1; channelNo <= channels.length; channelNo++) {
    const channel = channels.find((channel) => channel.id == channelNo);
    // needs to contain more later like a tooltip for a description:
    gridItems.push(<div style={{ gridColumn: 'span 60', gridRow: channelNo }}>{channel.name}</div>);

    const channelProgrammes = programmes.filter((programme) => programme.channelId == channel.id);
    const sortedChannelProgrammes = channelProgrammes.sort((a, b) => a.since - b.since);
    for (const programme of sortedChannelProgrammes) {
      const duration = calculateDurationInMinutes(new Date(programme.since), new Date(programme.till));
      gridItems.push(
        // dito:
        <div style={{ gridColumn: `span ${duration}`, gridRow: channelNo }}>{programme.title}</div>
      );
    }
  }
  return gridItems;
};