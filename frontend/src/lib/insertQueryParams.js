export const insertQueryParams = (baseUrl, paramsMap) => {
  const params = Object.entries(paramsMap).map(([key, value]) => `${key}=${value}`);
  let url = `${baseUrl}`;
  for (let i = 0; i < params.length; i++) {
    if (i == 0) url += '?';
    url += params[i];
    if (i != params.length - 1) url += '&';
  }
  return url;
};
