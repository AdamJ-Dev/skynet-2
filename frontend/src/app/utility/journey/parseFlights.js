import { getGetWeatherUrl } from '../../../config/api/selectors';
import { addIsoDurations } from '../../../lib/date/IsoDurations';
import { parseCoordinates } from './parseCoordinates';

export const squashFlights = (flights) => {
  const squashedFlights = [];
  for (const flight of flights) {
    const squashedFlight = {
      price: flight.price,
      homeCoordinates: flight.homeCoordinates,
      awayCoordinates: flight.awayCoordinates,
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

export const squashFlightLegs = (flightLegs) => {
  const firstLeg = flightLegs[0];
  const lastLeg = flightLegs[flightLegs.length - 1];
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
  const zeroDuration = 'PT0D0H0M';
  return flightLegs.reduce(
    (acc, flightLeg) => addIsoDurations(acc, flightLeg.duration),
    zeroDuration
  );
};

export const getWeatherUrlsMap = (savedFlights) => {
  const urls = {};
  const locations = getLocationsMap(savedFlights);
  for (const airport of Object.keys(locations)) {
    const { lat, lon } = parseCoordinates(locations[airport]);
    urls[airport] = getGetWeatherUrl({ lat, lon });
  }
  return urls;
};

const getLocationsMap = (savedFlights) => {
  const locations = {};
  for (const flight of squashFlights(savedFlights)) {
    locations[flight.outbound.departureAirport] = flight.homeCoordinates;
    locations[flight.outbound.arrivalAirport] = flight.awayCoordinates;
  }
  return locations;
};
