import { calculateDurationInMinutes } from '../../../../../lib/date/calculateDurationInMinutes';

export const numHeaderRows = 1;
export const channelsColumnTrack = 60;
export const minColumnWidth = '2.25px';

export const getGridInfo = (channels, programmes) => {
  const numRows = getNumRows(channels);
  const numColumms = getNumCols(programmes);
  return { numRows, numColumms };
};

const getNumRows = (channels) => {
  return numHeaderRows + channels.length; // search bar, channels rows
};

const getNumCols = (programmes) => {
  const epgStartTime = getMinStartTime(programmes);
  const epgEndTime = getMaxEndTime(programmes);
  const epgDurationInMinutes = calculateDurationInMinutes(epgStartTime, epgEndTime);
  return channelsColumnTrack + epgDurationInMinutes; // channels grid track, programme times columns
};

const getMinStartTime = (programmes) => {
  const allStartTimes = programmes.map((programme) => new Date(programme.since));
  return Math.min(...allStartTimes);
};

const getMaxEndTime = (programmes) => {
  const allEndTimes = programmes.map((programme) => new Date(programme.till));
  return Math.max(...allEndTimes);
};

export const getRow = (channelId) => {
  return numHeaderRows + parseInt(channelId);
};

export const spanColumns = (numColumns) => {
  return `span ${numColumns}`;
};
