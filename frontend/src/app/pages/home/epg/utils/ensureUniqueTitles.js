export const ensureUniqueTitles = (programmes) => {
  const programmesWithoutDuplicateTitles = [];
  const titles = {}; // used for preformance
  for (const programme of programmes) {
    if (titles[programme.title]) continue;
    else {
      programmesWithoutDuplicateTitles.push(programme);
      titles[programme.title] = 1;
    }
  }
  return programmesWithoutDuplicateTitles;
};
