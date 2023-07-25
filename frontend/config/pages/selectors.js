import pages from "./pages.json";

export const getHomePath = () => {
  return pages.home.path;
};

export const getLoginPath = () => {
  return pages.home.path;
};

export const getSignupPath = () => {
  return pages.home.path;
};

export const getProfilePath = (id) => {
  return pages.profile.basePath + id;
};

export const getProgrammePath = (id) => {
  return pages.programme.basePath + id;
};
