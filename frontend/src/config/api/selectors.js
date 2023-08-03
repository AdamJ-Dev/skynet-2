import api from './api.json';
import { insertQueryParams } from '../../lib/insertQueryParams';
import { getDefaultNumFlightsResults } from '../pages/selectors';
import { removeNullValues } from '../../lib/removeNullValues';

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

const getGetEpgProgrammesPath = () => {
  return api.epg.programmes.get.all.path;
};

export const getGetEpgProgrammesUrl = () => {
  return buildApiUrl(getGetEpgProgrammesPath());
};

const getGetEpgProgrammeBasePath = () => {
  return api.epg.programmes.get.one.basePath;
};

const getGetEpgProgrammeBaseUrl = () => {
  return buildApiUrl(getGetEpgProgrammeBasePath());
};

export const getGetEpgProgrammeUrl = (id) => {
  return `${getGetEpgProgrammeBaseUrl()}/${id}`;
};

const getGetEpgChannelsPath = () => {
  return api.epg.channels.get.path;
};

export const getGetEpgChannelsUrl = () => {
  return buildApiUrl(getGetEpgChannelsPath());
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
  return insertQueryParams(
    url,
    removeNullValues({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      numberOfResults,
    })
  );
};
