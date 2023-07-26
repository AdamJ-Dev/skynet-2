import pages from "./pages.json";

export const getHomePath = () => {
  return pages.home.path;
};

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
