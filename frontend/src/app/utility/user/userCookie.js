import { deleteCookie, getCookieValue, getCookies, selectCookie, setCookie } from '../../../lib/web/cookies';

export const getUserCookieValue = () => {
  const userCookie = selectCookie('user', getCookies());
  if (userCookie) {
    return getCookieValue(userCookie);
  } else return null;
};

export const setUserCookie = (userInfo) => {
  setCookie('user', JSON.stringify(userInfo));
};

export const deleteUserCookie = () => {
  deleteCookie('user');
}