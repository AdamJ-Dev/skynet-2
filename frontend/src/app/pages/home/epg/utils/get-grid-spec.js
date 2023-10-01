import { sortByAirTime } from './sort-by-air-time';

export const getGridSpec = (channels, programmes) => {
  const gridSpec = [];
  for (let channelNo = 1; channelNo <= channels.length; channelNo++) {
    const channel = channels.find((channel) => channel.id === channelNo);
    gridSpec.push({ channel });

    const channelProgrammes = programmes.filter(
      (programme) => programme.channelId === channelNo
    );
    const orderedChannelProgrammes = sortByAirTime(channelProgrammes);

    for (const programme of orderedChannelProgrammes) {
      gridSpec.push({ programme });
    }
  }
  return gridSpec;
};
