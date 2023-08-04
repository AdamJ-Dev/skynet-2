import { stringFormat } from '../../lib/stringFormat';
import pages from './pages.json';

// Home:

export const getHomePath = () => {
  return pages.home.path;
};

export const getHomeContentHeadline = () => {
  return pages.home.content.headline;
};

export const getHomeContentDescription = () => {
  return pages.home.content.description;
};

export const getLocationEnticement = () => {
  return pages.home.content.locationEnticement;
};

export const getEpgSearchPlaceholder = () => {
  return pages.home.content.programmessearchPlaceholder;
};

export const getEpgSearchLimit = () => {
  return pages.home.epg.programmesSearchLimit;
};

// Login:

export const getLoginPath = () => {
  return pages.login.path;
};

// Signup:

export const getSignupPath = () => {
  return pages.signup.path;
};

// Profile:

export const getProfileBasePath = () => {
  return pages.profile.basePath;
};

export const getProfilePath = (id) => {
  return `${getProfileBasePath()}/${id}`;
};

export const getNoSavedFlightsMessage = () => {
  return pages.profile.content.noSavedFlights;
};

// Programme:

export const getProgrammeBasePath = () => {
  return pages.programme.basePath;
};

export const getProgrammePath = (id) => {
  return `${getProgrammeBasePath()}/${id}`;
};

// - flights

export const getFlightsInfoDescription = (location) => {
  return stringFormat(pages.programme.content.flightsInfoDescription, location);
};

export const getAirportsSearchPlaceholder = () => {
  return pages.programme.content.airportsSearchPlaceholder;
};

export const getAirportsSearchLimit = () => {
  return pages.programme.flights.airportsSearchLimit;
};

export const getFlightsApiDisclaimer = () => {
  return pages.programme.content.flightsApiDisclaimer;
};

export const getGetAiportsNearMeMessage = () => {
  return pages.programme.content.getAirportsNearMe;
};

export const getFlightsInfoMissingMessage = () => {
  return pages.programme.content.flightsInfoMissing;
};

export const getFlightsReadyMessage = () => {
  return pages.programme.content.flightsReady;
};

export const getDefaultNumFlightsResults = () => {
  return pages.programme.flights.defaultNumFlightsResults;
};

export const getFlightsTableHeaders = () => {
  return pages.programme.flights.tableHeaders;
};

export const getGotFlightsMessage = () => {
  return pages.programme.content.gotFlights;
};

export const getNoFlightsMessage = () => {
  return pages.programme.content.noFlights;
};

// 404

export const get404DefaultPath = () => {
  return pages[404].defaultPath;
};
