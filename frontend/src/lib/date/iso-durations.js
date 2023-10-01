export const parseDuration = (isoDuration) => {
  const matchTimes = isoDuration.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/);

  const days = parseInt(matchTimes[1]) || 0;
  const hours = parseInt(matchTimes[2]) || 0;
  const minutes = parseInt(matchTimes[3]) || 0;

  return { days, hours, minutes };
};

export const formatDuration = (isoDuration) => {
  const { days, hours, minutes } = parseDuration(isoDuration);
  let result = `${minutes} mins`;
  if (hours) result = `${hours} hours, ${result}`;
  if (days) result = `${days} days, ${result}`;
  return result;
};

export const addIsoDurations = (d1, d2) => {
  const duration1 = parseDuration(d1);
  const duration2 = parseDuration(d2);

  const totalMinutes = duration1.minutes + duration2.minutes;
  const hoursOverflow = Math.floor(totalMinutes / 60);
  const remainderMinutes = totalMinutes % 60;

  const totalHours = duration1.hours + duration2.hours + hoursOverflow;
  const daysOverflow = Math.floor(totalHours / 24);
  const remainderHours = totalHours % 24;

  const totalDays = duration1.days + duration2.days + daysOverflow;

  return `P${totalDays}DT${remainderHours}H${remainderMinutes}M`;
};
