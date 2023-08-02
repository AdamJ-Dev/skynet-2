import api from './api.json';
import { insertQueryParams } from '../../lib/insertQueryParams';
import { getDefaultNumFlightsResults } from '../pages/selectors';

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_ENV == 'dev') {
    return api.baseDevUrl;
  } else {
    return api.baseProdUrl;
  }
};

const buildApiUrl = (path) => {
  return `${getApiBaseUrl()}${path}`;
};

// Weather:

const getGetWeatherPath = () => {
  return api.weather.get.path;
};

export const getGetWeatherUrl = (paramsMap) => {
  const url = buildApiUrl(getGetWeatherPath());
  return insertQueryParams(url, paramsMap);
};

// User:
const getSignupApiPath = () => {
  return api.user.signup.path;
};

export const getSignupApiUrl = () => {
  return buildApiUrl(getSignupApiPath());
};

const getLoginApiPath = () => {
  return api.user.login.path;
};

export const getLoginApiUrl = () => {
  return buildApiUrl(getLoginApiPath());
};

// Map:
const getGetMapPath = () => {
  return api.map.get.path;
};

export const getGetMapUrl = (lat, lon) => {
  const url = buildApiUrl(getGetMapPath());
  return insertQueryParams(url, { lat, lon });
};

// EPG:
// temp, ultimately want to switch to apiBaseUrl:
const jsonWebServerBaseUrl = 'http://localhost:4000';

const getGetEpgProgrammesPath = () => {
  return api.epg.programmes.get.all.path;
};

export const getGetEpgProgrammesUrl = () => {
  return `${jsonWebServerBaseUrl}${getGetEpgProgrammesPath()}`;
};

const getGetEpgProgrammeBasePath = () => {
  return api.epg.programmes.get.one.basePath;
};

const getGetEpgProgrammeBaseUrl = () => {
  return `${jsonWebServerBaseUrl}${getGetEpgProgrammeBasePath()}`;
};

export const getGetEpgProgrammeUrl = (id) => {
  return `${getGetEpgProgrammeBaseUrl()}/${id}`;
};

const getGetEpgChannelsPath = () => {
  return api.epg.channels.get.path;
};

export const getGetEpgChannelsUrl = () => {
  return `${jsonWebServerBaseUrl}${getGetEpgChannelsPath()}`;
};

// Flights

const getGetAirportsPath = () => {
  return api.flights.getAirports.path;
};

export const getGetAirportsUrl = (search) => {
  const url = buildApiUrl(getGetAirportsPath());
  return insertQueryParams(url, { search });
};

export const getGetNearestAirportPath = () => {
  return api.flights.getNearestAirport.path;
};

export const getGetNearestAirportUrl = (lat, lon) => {
  const url = buildApiUrl(getGetNearestAirportPath());
  return insertQueryParams(url, { lat, lon });
};

export const getGetAirportsQueryRegex = () => {
  return api.flights.getAirports.queryRegex;
};

export const getFlightsPath = () => {
  return api.flights.getFlights.path;
};

export const getFlightsUrl = (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate = null,
  numberOfResults = getDefaultNumFlightsResults()
) => {
  const url = buildApiUrl(getFlightsPath());
  return insertQueryParams(url, {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    numberOfResults,
  });
};
