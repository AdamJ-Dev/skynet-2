import messages from './messages.json';

export const getGenericErrorMessage = () => {
  return messages.error.generic;
};

export const getLocationErrorMessage = () => {
  return messages.error.location;
};

export const getLoadingMessage = () => {
  return messages.loading;
};
