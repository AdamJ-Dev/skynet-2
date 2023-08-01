import { RESPONSE_ERROR } from '../../app/utility/data-fetching/getResponseError';
import messages from './messages.json';

export const getGenericErrorMessage = () => {
  return messages.error.generic;
};

export const getLocationErrorMessage = () => {
  return messages.error.location;
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

export const getLoadingMessage = () => {
  return messages.loading;
};
