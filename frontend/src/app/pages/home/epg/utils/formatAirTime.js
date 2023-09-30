import { parseClockInfo } from '../../../../../lib/date/parseClockInfo';

export const formatAirTime = (since, till) => {
  const startTime = parseClockInfo(new Date(since));
  const endTime = parseClockInfo(new Date(till));
  return `${startTime}-${endTime}`;
};
