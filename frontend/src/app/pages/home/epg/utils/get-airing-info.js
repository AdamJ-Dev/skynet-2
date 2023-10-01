import { sortByAirTime } from './sort-by-air-time';

export const getAiringInfo = (title, programmes) => {
  const airingInfo = [];
  for (const programme of programmes) {
    if (programme.title === title) {
      const { since, till, channelId } = programme;
      airingInfo.push({ since, till, channelId });
    }
  }
  return sortByAirTime(airingInfo);
};
