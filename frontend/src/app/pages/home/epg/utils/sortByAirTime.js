export const sortByAirTime = (programmes) => {
  return programmes.sort((p1, p2) => new Date(p1.since) - new Date(p2.since));
};
