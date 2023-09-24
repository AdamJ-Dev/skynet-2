import { createContext, useEffect, useReducer } from 'react';
import { getCookieValue } from '../../../lib/web/cookies';
import { getUserCookieValue } from '../../utility/user/userCookie';

export const AuthContext = createContext();

const initialState = {
  user: null,
  initializing: true,
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const INITIALIZATION_COMPLETE = 'INITIALIZATION_COMPLETE';

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case INITIALIZATION_COMPLETE: {
      return { ...state, initializing: false };
    }
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
    dispatch({ type: INITIALIZATION_COMPLETE });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
