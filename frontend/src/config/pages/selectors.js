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
  return pages.home.content.searchPlaceholder;
};

export const getEpgSearchLimit = () => {
  return pages.home.epg.searchLimit;
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
