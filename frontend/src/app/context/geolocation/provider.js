import { createContext, useReducer } from 'react';
import { getLocationErrorMessage } from '../../../config/messages/selectors';

export const GeolocationContext = createContext();

const initialState = {
  waiting: true,
  location: null,
  error: null,
};

export const SET_LOCATION = 'SET_LOCATION';
export const SET_LOCATION_ERROR = 'SET_LOCATION_ERROR';

export const geolocationReducer = (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, waiting: false, location: action.payload };
    case SET_LOCATION_ERROR:
      return { ...state, waiting: false, error: getLocationErrorMessage() };
    default:
      return state;
  }
};

export const GeolocationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(geolocationReducer, initialState);

  return <GeolocationContext.Provider value={{ ...state, dispatch }}>{children}</GeolocationContext.Provider>;
};
