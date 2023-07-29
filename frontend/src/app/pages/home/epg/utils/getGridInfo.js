import { calculateDurationInMinutes } from '../../../../../lib/calculateDuration';

export const getGridInfo = (channels, programmes) => {
  const numRows = getNumRows(channels);
  const numColumms = getNumCols(programmes);
  return { numRows, numColumms };
};

const getNumRows = (channels) => {
  return 2 + channels.length; // search bar, headings row, channels rows
};

const getNumCols = (programmes) => {
  const epgStartTime = getMinStartTime(programmes);
  const epgEndTime = getMaxEndTime(programmes);
  const epgDurationInMinutes = calculateDurationInMinutes(epgStartTime, epgEndTime);
  return epgDurationInMinutes;
};

const getMinStartTime = (programmes) => {
  const allStartTimes = programmes.map((programme) => new Date(programme.since));
  return Math.min(...allStartTimes);
};

const getMaxEndTime = (programmes) => {
  const allEndTimes = programmes.map((programme) => new Date(programme.till));
  return Math.max(...allEndTimes);
};
