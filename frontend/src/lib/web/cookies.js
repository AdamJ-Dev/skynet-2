export const getCookies = () => {
  return document.cookie.split('; ');
};

export const selectCookie = (key, cookies) => {
  return cookies.find((cookie) => cookie.startsWith(`${key}=`));
};

export const getCookieValue = (cookie) => {
  const utf8Value = cookie.split('=')[1];
  return decodeURIComponent(utf8Value);
};

export const setCookie = (key, value, path="/") => {
  const cookie = `${key}=${encodeURIComponent(value)}; path=${path}`;
  document.cookie = cookie;
};

export const deleteCookie = (key, path = "/") => {
  const selector = `${key}=`;
  const expirySpec = '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  const pathSpec = path ? `; path=${path}` : '';
  document.cookie = selector + expirySpec + pathSpec;
};