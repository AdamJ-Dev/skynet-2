import { RESPONSE_ERROR } from '../../app/utility/data-fetching/getResponseError';
import messages from './messages.json';

// errors:

export const getGenericErrorMessage = () => {
  return messages.error.generic;
};

export const getInvalidSearchQueryMessage = () => {
  return messages.error.invalidSearchQuery;
};

// - location:

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

// - user:

export const getGetUser403ErrorMessage = () => {
  return messages.error.user.get[403];
};

export const getLogin401ErrorMessage = () => {
  return messages.error.user.login[401];
};

export const getConfirmPasswordErrorMessage = () => {
  return messages.error.user.signup.confirmPassword;
};

// - flights:

export const getDestNearestAiportErrorMessage = () => {
  return messages.error.flights.nearestDestAirport;
};

export const getDepartureArrivalMatchMessage = () => {
  return messages.error.flights.matchingDepartureAndArrival;
};

// other:

export const getLoadingMessage = () => {
  return messages.loading;
};

export const getNoSearchResultsMessage = () => {
  return messages.noSearchResults;
};

export const getSite404Message = () => {
  return messages.site404;
}