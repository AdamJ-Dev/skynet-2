import { createContext, useEffect, useReducer } from 'react';
import { getGetNearestAirportUrl, getGetWeatherUrl } from '../../../config/api/selectors';
import useFetch from '../../hooks/useFetch';
import { nearestAiportErrorParser } from '../../utility/error-handling/nearestAirportErrorParser';
import { getDepartureArrivalMatchMessage } from '../../../config/messages/selectors';
import { parseCoordinates } from '../../utility/journey/parseCoordinates';

export const JourneyContext = createContext();

const initialState = {
  destination: null,
  departureAirport: null,
  departureWeather: [],
  arrivalAirport: null,
  arrivalWeather: [],
  departureDate: null,
  returnDate: null,
  arrivalLoading: false,
  weatherLoading: false,
  error: null,
};

export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_DEPARTURE_AIRPORT = 'SET_DEPARTURE_AIRPORT';
export const SET_DEPARTURE_WEATHER = 'SET_DEPARTURE_WEATHER';
export const SET_ARRIVAL_AIRPORT = 'SET_LOCATION_ERROR';
export const SET_ARRIVAL_WEATHER = 'SET_ARRIVAL_WEATHER';
export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_RETURN_DATE = 'SET_RETURN_DATE';
export const SET_ARRIVAL_LOADING = 'SET_ARRIVAL_LOADING';
export const SET_WEATHER_LOADING = 'SET_WEATHER_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const REFRESH_JOURNEY = 'REFRESH_JOURNEY';

export const journeyReducer = (state, action) => {
  switch (action.type) {
    case SET_DESTINATION:
      return { ...state, destination: action.payload };
    case SET_DEPARTURE_AIRPORT:
      return { ...state, departureAirport: action.payload };
    case SET_DEPARTURE_WEATHER:
      return { ...state, departureWeather: action.payload };
    case SET_ARRIVAL_AIRPORT:
      return { ...state, arrivalAirport: action.payload };
    case SET_ARRIVAL_WEATHER:
      return { ...state, arrivalWeather: action.payload };
    case SET_DEPARTURE_DATE:
      return { ...state, departureDate: action.payload };
    case SET_RETURN_DATE:
      return { ...state, returnDate: action.payload };
    case SET_ARRIVAL_LOADING:
      return { ...state, arrivalLoading: action.payload };
    case SET_WEATHER_LOADING:
      return { ...state, weatherLoading: action.payload };
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
    loading: arrivalAirportLoading,
    error: arrivalAirportError,
    get: getNearestAirportToDestination,
  } = useFetch();
  const {
    data: arrivalWeatherData,
    loading: arrivalWeatherLoading,
    error: arrivalWeatherError,
    get: getArrivalWeather,
  } = useFetch();
  const {
    data: departureWeatherData,
    loading: departureWeatherLoading,
    error: departureWeatherError,
    get: getDepartureWeather,
  } = useFetch();

  // once received the destination, get the arrival airport
  useEffect(() => {
    if (state.destination) {
      const { lat, lon } = state.destination;
      getNearestAirportToDestination({
        url: getGetNearestAirportUrl(lat, lon),
        errorParser: nearestAiportErrorParser,
      });
    }
  }, [state.destination]);

  // once got the arrival aiport, set the arrival airport
  useEffect(() => {
    if (arrivalAirportData) {
      dispatch({ type: SET_ARRIVAL_AIRPORT, payload: arrivalAirportData });
    }
  }, [arrivalAirportData]);

  // once set the airports, get the weather
  useEffect(() => {
    if (state.arrivalAirport) {
      const { lat, lon } = parseCoordinates(state.arrivalAirport.coordinates);
      getArrivalWeather({ url: getGetWeatherUrl({ lat, lon }) });
    }
  }, [state.arrivalAirport]);

  useEffect(() => {
    if (state.departureAirport) {
      const { lat, lon } = parseCoordinates(state.departureAirport.coordinates);
      getDepartureWeather({ url: getGetWeatherUrl({ lat, lon }) });
    }
  }, [state.departureAirport]);

  // once got the weather, set the weather
  useEffect(() => {
    if (arrivalWeatherData) {
      dispatch({ type: SET_ARRIVAL_WEATHER, payload: arrivalWeatherData });
    }
  }, [arrivalWeatherData]);

  useEffect(() => {
    if (departureWeatherData) {
      dispatch({ type: SET_DEPARTURE_WEATHER, payload: departureWeatherData });
    }
  }, [departureWeatherData]);

  // track loading state
  useEffect(() => {
    dispatch({ type: SET_ARRIVAL_LOADING, payload: arrivalAirportLoading });
  }, [arrivalAirportLoading]);

  useEffect(() => {
    dispatch({ type: SET_WEATHER_LOADING, payload: arrivalAirportLoading || departureWeatherLoading });
  }, [arrivalWeatherLoading, departureWeatherLoading]);

  // be wary of errors
  useEffect(() => {
    const error = arrivalAirportError || arrivalWeatherError || departureWeatherError;
    if (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }, [arrivalAirportError, arrivalWeatherError, departureWeatherError]);

  // be wary of edge case
  useEffect(() => {
    const departure = state.departureAiport;
    const arrival = state.arrivalAirport;
    if (departure && arrival && departure.airportCode === arrival.airportCode) {
      dispatch({ type: SET_ERROR, payload: getDepartureArrivalMatchMessage() });
    }
  }, [state.arrivalAirport, state.departureAirport]);

  return <JourneyContext.Provider value={{ ...state, dispatch }}>{children}</JourneyContext.Provider>;
};
