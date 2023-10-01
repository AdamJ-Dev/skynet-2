import {
  getGenericErrorMessage,
  getLogin401ErrorMessage,
} from '../../../config/messages/selectors';

export const loginErrorParser = (error) => {
  switch (error.status) {
    case 401:
      return getLogin401ErrorMessage();
    default:
      return getGenericErrorMessage();
  }
};
