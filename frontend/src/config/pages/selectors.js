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

// Programme:

export const getProgrammeBasePath = () => {
  return pages.programme.basePath;
};

export const getProgrammePath = (id) => {
  return `${getProgrammeBasePath()}/${id}`;
};

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
