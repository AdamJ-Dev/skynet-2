import { createContext, useEffect, useReducer } from 'react';
import { getCookieValue } from '../../../lib/cookies';
import { getUserCookieValue } from '../../utility/user/userCookie';

export const AuthContext = createContext();

const initialState = {
  user: null,
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(getUserCookieValue());
    if (user) {
      dispatch({ type: LOGIN, payload: user });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
