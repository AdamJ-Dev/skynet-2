import { getGenericErrorMessage, getLogin401ErrorMessage } from '../../../config/messages/selectors';

export const NOT_FOUND = "NOT_FOUND";

export const getProgrammeErrorParser = (error) => {
  switch (error.status) {
    case 404:
      return NOT_FOUND;
    default:
      return getGenericErrorMessage();
  }
};
