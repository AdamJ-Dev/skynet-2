import { createContext, useReducer } from 'react';

export const WeatherContext = createContext();

const initialState = {
  weather: [],
};

export const SET_WEATHER = 'SET_WEATHER';

export const weatherReducer = (state, action) => {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    default:
      return state;
  }
};

export const WeatherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return <WeatherContext.Provider value={{ ...state, dispatch }}>{children}</WeatherContext.Provider>;
};
