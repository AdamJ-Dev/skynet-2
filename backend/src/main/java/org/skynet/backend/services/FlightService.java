package org.skynet.backend.services;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ClientException;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.skynet.backend.rest.dtos.FlightDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightService {
    private static String key = System.getenv("AMADEUS_KEY");
    private static String secret = System.getenv("AMADEUS_SECRET");
    static Amadeus amadeus = Amadeus.builder(key, secret).build();
    static ObjectMapper objectMapper = new ObjectMapper();
    public List<FlightDTO> getMultipleFlightDTOs(
            String originLocationCode,
            String destinationLocationCode,
            String departureDate,
            String returnDate,
            int numberOfResults
    ) throws JsonProcessingException, ResponseException {
        FlightOfferSearch[] flightOfferSearches;
        try {
            if (returnDate != null) {
                flightOfferSearches = amadeus.shopping.flightOffersSearch.get(
                        Params.with("originLocationCode", originLocationCode)
                                .and("destinationLocationCode", destinationLocationCode)
                                .and("departureDate", departureDate)
                                .and("returnDate", returnDate)
                                .and("adults", 1)
                                .and("currencyCode", "GBP")
                                .and("max", numberOfResults));
            } else {
                flightOfferSearches = amadeus.shopping.flightOffersSearch.get(
                        Params.with("originLocationCode", originLocationCode)
                                .and("destinationLocationCode", destinationLocationCode)
                                .and("departureDate", departureDate)
                                .and("adults", 1)
                                .and("currencyCode", "GBP")
                                .and("max", numberOfResults));
            }
        } catch (ClientException e) {
            var response = e.getResponse();
            HttpStatus statusCode = HttpStatus.valueOf(response.getStatusCode());
            JsonNode body = objectMapper.readTree(response.getBody());
            String errMsg = "";
            for (JsonNode error : body.get("errors")) {
                errMsg += error.get("detail").asText() + ". ";
            }
            throw new ResponseStatusException(statusCode, errMsg);
        }

        return flightOfferToDTO(flightOfferSearches, returnDate);
    }

    public List<FlightDTO> flightOfferToDTO(FlightOfferSearch[] flightOfferSearches, String returnDate) {

        List<FlightDTO> flightDTOS = new ArrayList<>();
        if (returnDate != null) {
            for (var flightOfferSearch : flightOfferSearches) {
                flightDTOS.add(getFlightDTO(flightOfferSearch));
            }
        } else {
            for (var flightOfferSearch : flightOfferSearches) {
                flightDTOS.add(getOneWayFlightDTO(flightOfferSearch));
            }
        }
        return flightDTOS;
    }

    private List<FlightDTO.Leg> getJourneyLegs(FlightOfferSearch.Itinerary journey){
        List<FlightDTO.Leg> journeyLegs = new ArrayList<>();
        for (var segment : journey.getSegments()) {
            String departureTime = segment.getDeparture().getAt();
            String arrivalTime = segment.getArrival().getAt();
            String departureAirport = segment.getDeparture().getIataCode();
            String arrivalAirport = segment.getArrival().getIataCode();
            String duration = segment.getDuration();
            FlightDTO.Leg leg = new FlightDTO.Leg(departureTime, arrivalTime, departureAirport, arrivalAirport, duration);
            journeyLegs.add(leg);
        }
        return journeyLegs;
    }

    private Double getFlightPrice(FlightOfferSearch flightOfferSearch) {
        return Double.parseDouble(flightOfferSearch.getPrice().getTotal());
    }

    public FlightDTO getOneWayFlightDTO(FlightOfferSearch flightOfferSearch) {
        FlightOfferSearch.Itinerary outboundJourney = flightOfferSearch.getItineraries()[0];
        Double dtoPrice = getFlightPrice(flightOfferSearch);
        String dtoOutboundDuration = outboundJourney.getDuration();
        List<FlightDTO.Leg> dtoOutboundJourney = getJourneyLegs(outboundJourney);
        FlightDTO flightDTO = new FlightDTO(dtoPrice, null, dtoOutboundJourney, null, dtoOutboundDuration);
        return flightDTO;
    }

    public FlightDTO getFlightDTO(FlightOfferSearch flightOfferSearch) {
        FlightOfferSearch.Itinerary outboundJourney = flightOfferSearch.getItineraries()[0];
        FlightOfferSearch.Itinerary inboundJourney = flightOfferSearch.getItineraries()[1];
        Double dtoPrice = getFlightPrice(flightOfferSearch);
        String dtoOutboundDuration = outboundJourney.getDuration();
        String dtoInboundDuration = inboundJourney.getDuration();
        List<FlightDTO.Leg> dtoOutboundJourney = getJourneyLegs(outboundJourney);
        List<FlightDTO.Leg> dtoInboundJourney = getJourneyLegs(inboundJourney);
        FlightDTO flightDTO = new FlightDTO(dtoPrice, dtoInboundJourney, dtoOutboundJourney, dtoInboundDuration, dtoOutboundDuration);
        return flightDTO;
    }

}