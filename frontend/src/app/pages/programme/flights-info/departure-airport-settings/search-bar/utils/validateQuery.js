import { getGetAirportsQueryRegex } from '../../../../../../../config/api/selectors';

export const isValidQuery = (query) => {
  const regex = new RegExp(getGetAirportsQueryRegex());
  return regex.test(query);
};
