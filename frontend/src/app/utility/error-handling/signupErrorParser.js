import { getGenericErrorMessage } from '../../../config/messages/selectors';

export const signupErrorParser = async (error) => {
  switch (error.status) {
    case 400:
      const body = await error.response.json();
      return body.message;
    default:
      return getGenericErrorMessage();
  }
};


