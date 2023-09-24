import { addIsoDurations } from "../../../../lib/date/IsoDurations";
import { extractCalendarDate } from "../../../../lib/date/extractCalendarDate";

export const getMassagedFlights = (flights, weatherForcast) => {
  return addWeatherToFlights(squashFlights(flights), weatherForcast);
};

const squashFlights = (flights) => {
  const squashedFlights = [];
  for (const flight of flights) {
    const squashedFlight = {
      price: flight.price,
      isReturn: !!flight.inboundDuration,
      outbound: {
        ...squashFlightLegs(flight.outboundLegs),
        totalDuration: flight.outboundDuration,
      },
    };
    if (squashedFlight.isReturn) {
      squashedFlight.inbound = {
        ...squashFlightLegs(flight.inboundLegs),
        totalDuration: flight.inboundDuration,
      };
    }
    squashedFlights.push(squashedFlight);
  }
  return squashedFlights;
};

const squashFlightLegs = (flightLegs) => {
  const firstLeg = flightLegs[0];
  const lastLeg = flightLegs[flightLegs.length-1];
  return {
    departureAirport: firstLeg.departureAirport,
    arrivalAirport: lastLeg.arrivalAirport,
    initialDeparture: firstLeg.departureTime,
    finalArrival: lastLeg.arrivalTime,
    timeSpentFlying: getFlyingDuration(flightLegs),
    numChanges: flightLegs.length - 1,
  };
};

const getFlyingDuration = (flightLegs) => {
  return flightLegs.reduce((acc, flightLeg) => addIsoDurations(acc, flightLeg.duration), 'PT0D0H0M');
};

export const addWeatherToFlights = (squashedFlights, weatherForcast) => {
  const daysWeatherMap = {};
  for (const dayOfWeather of weatherForcast) {
    daysWeatherMap[dayOfWeather.time] = dayOfWeather;
  }
  const flightsWithWeather = [];
  for (const flight of squashedFlights) {
    const flightWithWeather = { ... flight, outbound: addWeatherToFlightComponent(flight.outbound, daysWeatherMap) }
    flightsWithWeather.push(flightWithWeather);
  }
  return flightsWithWeather;
};

const addWeatherToFlightComponent = (component, weatherMap) => {
  const dayOfArrival = extractCalendarDate(component.finalArrival);
  if (weatherMap[dayOfArrival]) {
    return { ... component, weather: weatherMap[dayOfArrival] };
  } else return component;
};