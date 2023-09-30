export const insertQueryParams = (baseUrl, paramsMap) => {
  const paramsBuilder = new URLSearchParams();
  for (const [key, value] of Object.entries(paramsMap)) {
    paramsBuilder.append(key, value);
  }
  const paramsStr = paramsBuilder.toString();
  if (paramsStr) {
    return `${baseUrl}?${paramsStr}`;
  } else {
    return baseUrl;
  }
};
