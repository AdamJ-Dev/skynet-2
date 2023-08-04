import { getGenericErrorMessage, getLogin401ErrorMessage } from '../../../config/messages/selectors';

export const INAUTHED_ERROR = "INAUTHED_ERROR";

export const getUserErrorParser = (error) => {
  switch (error.status) {
    case 401:
      return INAUTHED_ERROR;
    case 403:
      return getLogin401ErrorMessage();
    default:
      return getGenericErrorMessage();
  }
};
