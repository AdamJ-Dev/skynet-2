import { createContext, useReducer } from 'react';

export const ProfileContext = createContext();

const initialState = {
  userFlights: [],
};

export const SET_USER_FLIGHTS = 'SET_USER_FLIGHTS';

export const profileReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_FLIGHTS:
      return { ...state, userFlights: action.payload };
    default:
      return state;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>;
};
