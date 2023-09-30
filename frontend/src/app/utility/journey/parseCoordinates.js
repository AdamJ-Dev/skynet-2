import { csvToArray } from '../../../lib/string/csv';

export const parseCoordinates = (airportCoordinates) => {
  const [lat, lon] = csvToArray(airportCoordinates);
  return { lat, lon };
};

