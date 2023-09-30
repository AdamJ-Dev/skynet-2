import { extractCalendarDate } from '../../../../lib/date/extractCalendarDate';
import { squashFlights } from '../../../utility/journey/parseFlights';

export const getMassagedFlights = (flights, weatherMap) => {
  return addWeatherToFlights(squashFlights(flights), weatherMap);
};

export const addWeatherToFlights = (squashedFlights, weatherMap) => {
  const flightsWithWeather = [];
  for (const flight of squashedFlights) {
    const flightWithWeather = {
      ...flight,
      outbound: addWeatherToFlightComponent(flight.outbound, weatherMap[flight.outbound.arrivalAirport]),
      ...(flight.isReturn && {
        inbound: addWeatherToFlightComponent(flight.inbound, weatherMap[flight.inbound.arrivalAirport]),
      }),
    };
    flightsWithWeather.push(flightWithWeather);
  }
  return flightsWithWeather;
};

const addWeatherToFlightComponent = (component, forecast) => {
  const daysOfWeather = getDaysOfWeather(forecast);
  const dayOfArrival = extractCalendarDate(component.finalArrival);
  if (daysOfWeather[dayOfArrival]) {
    return { ...component, weather: daysOfWeather[dayOfArrival] };
  } else {
    return component;
  }
};

const getDaysOfWeather = (forecast) => {
  const daysOfWeather = {};
  for (const dayOfWeather of forecast) {
    daysOfWeather[dayOfWeather.time] = dayOfWeather;
  }
  return daysOfWeather;
};
