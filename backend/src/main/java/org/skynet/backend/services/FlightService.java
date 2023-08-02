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
    static Amadeus amadeus = Amadeus.builder(key,secret).build();

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
            flightOfferSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", originLocationCode)
                            .and("destinationLocationCode", destinationLocationCode)
                            .and("departureDate", departureDate)
                            .and("returnDate", returnDate)
                            .and("adults", 1)
                            .and("currencyCode", "GBP")
                            .and("max", numberOfResults));
        } catch (ClientException e) {
            var response = e.getResponse();
            HttpStatus statusCode = HttpStatus.valueOf(response.getStatusCode());
            JsonNode body = objectMapper.readTree(response.getBody());
            String errMsg = "";
            for(JsonNode error : body.get("errors")) {
                errMsg += error.get("detail").asText() + ". ";
            }
            throw new ResponseStatusException(statusCode, errMsg);
        }

        return flightOfferToDTO(flightOfferSearches);
    }

    public List<FlightDTO> flightOfferToDTO(FlightOfferSearch[] flightOfferSearches) {
        List<FlightDTO> flightDTOS = new ArrayList<>();
        for(var flightOfferSearch : flightOfferSearches) {
            flightDTOS.add(getFlightDTO(flightOfferSearch));
        }

        return flightDTOS;
    }


    public FlightDTO getFlightDTO(FlightOfferSearch flightOfferSearch) {
        FlightOfferSearch.Itinerary outboundJourney = flightOfferSearch.getItineraries()[0];
        FlightOfferSearch.Itinerary inboundJourney = flightOfferSearch.getItineraries()[1];

        Double dtoPrice = Double.parseDouble(flightOfferSearch.getPrice().getTotal());
        String dtoOutboundDuration = outboundJourney.getDuration();
        String dtoInboundDuration = inboundJourney.getDuration();

        List<FlightDTO.Leg> dtoOutboundJourney = new ArrayList<>();
        for (var outboundSegment : outboundJourney.getSegments()) {
            String departureTime = outboundSegment.getDeparture().getAt();
            String arrivalTime = outboundSegment.getArrival().getAt();
            String departureAirport = outboundSegment.getDeparture().getIataCode();
            String arrivalAirport = outboundSegment.getArrival().getIataCode();
            String duration = outboundSegment.getDuration();

            FlightDTO.Leg outboundLeg = new FlightDTO.Leg(departureTime, arrivalTime, departureAirport, arrivalAirport, duration);
            dtoOutboundJourney.add(outboundLeg);
        }

        List<FlightDTO.Leg> dtoInboundJourney = new ArrayList<>();
        for (var inboundSegment : inboundJourney.getSegments()) {
            String departureTime = inboundSegment.getDeparture().getAt();
            String arrivalTime = inboundSegment.getArrival().getAt();
            String departureAirport = inboundSegment.getDeparture().getIataCode();
            String arrivalAirport = inboundSegment.getArrival().getIataCode();
            String duration = inboundSegment.getDuration();

            FlightDTO.Leg inboundLeg = new FlightDTO.Leg(departureTime, arrivalTime, departureAirport, arrivalAirport, duration);
            dtoInboundJourney.add(inboundLeg);
        }

        FlightDTO flightDTO = new FlightDTO(dtoPrice, dtoInboundJourney, dtoOutboundJourney, dtoInboundDuration, dtoOutboundDuration);
        return flightDTO;
    }

}