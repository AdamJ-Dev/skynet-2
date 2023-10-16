export const parseClockInfo = (date) => {
  return date.toLocaleTimeString('en-GB', {
    hours: '2-digit',
    minute: '2-digit',
  });
};
