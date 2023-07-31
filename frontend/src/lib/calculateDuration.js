export const calculateDurationInMinutes = (fromDate, toDate) => {
  return Math.floor((toDate - fromDate) / (1000 * 60));
};
