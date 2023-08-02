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

export const getLoginErrorMessage = (error) => {
  if (error.name == RESPONSE_ERROR) {
    // switch (error.status) {
    //   case 400:
    //
    //  ...
    // }
    //  ^^ some such in future ^^
    return getGenericErrorMessage();
  } else {
    return getGenericErrorMessage();
  }
};

export const getConfirmPasswordErrorMessage = () => {
  return messages.error.user.signup.confirmPassword;
};

export const getSignupErrorMessage = (error) => {
  if (error.name == RESPONSE_ERROR) {
    // switch (error.status) {
    //   case 400:
    //     return messages.error.signup[error.message]
    //  ...
    // }
    //  ^^ some such in future ^^
    return getGenericErrorMessage();
  } else {
    return getGenericErrorMessage();
  }
};

// other:

export const getLoadingMessage = () => {
  return messages.loading;
};

export const getNoSearchResultsMessage = () => {
  return messages.noSearchResults;
};