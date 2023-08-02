import { createContext, useEffect, useReducer } from 'react';
import { getGetNearestAirportUrl } from '../../../config/api/selectors';
import useFetch from '../../hooks/useFetch';

export const JourneyContext = createContext();

const initialState = {
  destination: null,
  departureAirport: null,
  arrivalAirport: null,
  departureDate: null,
  returnDate: null,
  error: null,
};

export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_DEPARTURE_AIRPORT = 'SET_DEPARTURE_AIRPORT';
export const SET_ARRIVAL_AIRPORT = 'SET_LOCATION_ERROR';
export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_RETURN_DATE = 'SET_RETURN_DATE';
export const SET_ERROR = 'SET_ERROR';
export const REFRESH_JOURNEY = 'REFRESH_JOURNEY';

export const journeyReducer = (state, action) => {
  switch (action.type) {
    case SET_DESTINATION:
      return { ...state, destination: action.payload };
    case SET_DEPARTURE_AIRPORT:
      return { ...state, departureAirport: action.payload };
    case SET_ARRIVAL_AIRPORT:
      return { ...state, arrivalAirport: action.payload };
    case SET_DEPARTURE_DATE:
      return { ...state, departureDate: action.payload };
    case SET_RETURN_DATE:
      return { ...state, returnDate: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case REFRESH_JOURNEY:
      return initialState;
    default:
      return state;
  }
};

export const JourneyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journeyReducer, initialState);
  const {
    data: arrivalAirportData,
    error: arrivalAirportError,
    get: getNearestAirportToDestination,
  } = useFetch('');

  useEffect(() => {
    if (state.destination) {
      const { lat, lon } = state.destination.coordinates;
      getNearestAirportToDestination({ url: getGetNearestAirportUrl(lat, lon) });
    }
  }, [state.destination]);

  useEffect(() => {
    let payload = null;
    if (arrivalAirportData) {
      payload = arrivalAirportData;
    }
    dispatch({ type: SET_ARRIVAL_AIRPORT, payload });
  }, [arrivalAirportData]);

  useEffect(() => {
    let payload = null;
    if (arrivalAirportError) {
      console.log({ arrivalAirportError })
      payload = arrivalAirportError;
    }
    dispatch({ type: SET_ERROR, payload });
  }, [arrivalAirportError]);

  return <JourneyContext.Provider value={{ ...state, dispatch }}>{children}</JourneyContext.Provider>;
};
