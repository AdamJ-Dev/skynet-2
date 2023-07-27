import api from './api.json';
import { insertQueryParams } from '../../lib/insertQueryParams';

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_ENV == 'dev') {
    return api.baseDevUrl;
  } else {
    return api.baseProdUrl;
  }
};

const getGetWeatherPath = () => {
  return api.weather.get.path;
};

export const getGetWeatherUrl = (paramsMap) => {
  return getApiBaseUrl() + insertQueryParams(getGetWeatherPath(), paramsMap);
};
