import { createContext, useReducer } from 'react';

export const EpgContext = createContext();

const initialState = {
  programmes: [],
  channels: [],
};

export const SET_PROGRAMMES = 'SET_PROGRAMMES';
export const SET_CHANNELS = 'SET_CHANNELS';

export const epgReducer = (state, action) => {
  switch (action.type) {
    case SET_PROGRAMMES:
      return { ...state, programmes: action.payload };
    case SET_CHANNELS:
      return { ...state, channels: action.payload };
    default:
      return state;
  }
};

export const EpgContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(epgReducer, initialState);

  return <EpgContext.Provider value={{ ...state, dispatch }}>{children}</EpgContext.Provider>;
};
