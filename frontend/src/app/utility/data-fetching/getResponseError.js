export const RESPONSE_ERROR = 'ResponseError';

export const getResponseError = async (response) => {
  const error = new Error();
  error.name = RESPONSE_ERROR;
  error.status = response.status;
  error.response = response;
  return error;
};
