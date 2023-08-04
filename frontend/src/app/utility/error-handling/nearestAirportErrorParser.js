import { getDestNearestAiportErrorMessage } from '../../../config/messages/selectors';

export const nearestAiportErrorParser = (error) => {
  return getDestNearestAiportErrorMessage();
};
