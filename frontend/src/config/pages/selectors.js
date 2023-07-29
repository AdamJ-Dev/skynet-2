import pages from './pages.json';

export const getHomePath = () => {
  return pages.home.path;
};

export const getHomeContentHeadline = () => {
  return pages.home.content.headline;
}

export const getHomeContentDescription = () => {
  return pages.home.content.description;
}

export const getEpgSearchPlaceholder = () => {
  return pages.home.epg.searchPlaceholder;
};

export const getEpgSearchLimit = () => {
  return pages.home.epg.searchLimit;
}

export const getLoginPath = () => {
  return pages.login.path;
};

export const getSignupPath = () => {
  return pages.signup.path;
};

export const getProfileBasePath = () => {
  return pages.profile.basePath;
};

export const getProfilePath = (id) => {
  return `${getProfileBasePath()}/${id}`;
};

export const getProgrammeBasePath = () => {
  return pages.programme.basePath;
};

export const getProgrammePath = (id) => {
  return `${getProgrammeBasePath()}/${id}`;
};
