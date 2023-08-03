import { RESPONSE_ERROR } from '../../app/utility/data-fetching/getResponseError';
import messages from './messages.json';

// errors:

export const getGenericErrorMessage = () => {
  return messages.error.generic;
};

export const getGenericLocationErrorMessage = () => {
  return messages.error.location.generic;
};

export const getLocationDeniedErrorMessage = () => {
  return messages.error.location.permissionDenied;
};

export const getLocationUnavailableErrorMessage = () => {
  return messages.error.location.positionUnavailable;
};

export const getLocationTimeoutErrorMessage = () => {
  return messages.error.location.timeout;
};

export const getInvalidSearchQueryMessage = () => {
  return messages.error.invalidSearchQuery;
};

export const getLogin401ErrorMessage = () => {
  return messages.error.user.login[401];
};

export const getConfirmPasswordErrorMessage = () => {
  return messages.error.user.signup.confirmPassword;
};

// other:

export const getLoadingMessage = () => {
  return messages.loading;
};

export const getNoSearchResultsMessage = () => {
  return messages.noSearchResults;
};