import api from './api.json';
import { insertQueryParams } from '../../lib/insertQueryParams';

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_ENV == 'dev') {
    return api.baseDevUrl;
  } else {
    return api.baseProdUrl;
  }
};

// Weather:

const getGetWeatherPath = () => {
  return api.weather.get.path;
};

export const getGetWeatherUrl = (paramsMap) => {
  const url = `${getApiBaseUrl()}/${getGetWeatherPath()}`
  return insertQueryParams(url, paramsMap);
};


// EPG:


// temp, then switch to apiBaseUrl:
const jsonWebServerBaseUrl = 'http://localhost:4000'


const getGetEpgProgrammesPath = () => {
  return api.epg.programmes.get.path;
};


export const getGetEpgProgrammesUrl = () => {
  return `${jsonWebServerBaseUrl}${getGetEpgProgrammesPath()}`;
}

const getGetEpgChannelsPath = () => {
  return api.epg.channels.get.path;
};

export const getGetEpgChannelsUrl = () => {
  return `${jsonWebServerBaseUrl}${getGetEpgChannelsPath()}`;
}