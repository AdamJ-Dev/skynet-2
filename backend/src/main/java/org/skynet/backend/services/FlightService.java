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

    private static String key = System.getenv("key");

    private static String secret = System.getenv("secret");
    static Amadeus amadeus = Amadeus.builder(key,secret).build();

    static ObjectMapper objectMapper = new ObjectMapper();

    public List<FlightDTO> getMultipleFlightDTOs
            (String originLocationCode, String destinationLocationCode, String departureDate, String returnDate, int numberOfResults)
            throws JsonProcessingException, ResponseException {
        FlightOfferSearch[] flightOffersSearches;
        try {
            flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", originLocationCode)
                            .and("destinationLocationCode", destinationLocationCode)
                            .and("departureDate", departureDate)
                            .and("returnDate", returnDate)
                            .and("adults", 1)
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

        List<FlightDTO> flightDTOS = new ArrayList<>();
        for(int i = 0; i < numberOfResults; i++) {
            flightDTOS.add(getFlightDTO(flightOffersSearches[i]));
        }

        return flightDTOS;
    }


    public FlightDTO getFlightDTO(FlightOfferSearch flightOffersSearches) throws JsonProcessingException {

        String result = flightOffersSearches.getResponse().getBody();
        JsonNode resultJson = objectMapper.readTree(result);
        JsonNode journey1 = resultJson.get("data").get(0);
        JsonNode outboundJourney = journey1.get("itineraries").get(0);
        JsonNode inboundJourney = journey1.get("itineraries").get(1);

        Double dtoPrice = journey1.get("price").get("total").asDouble();
        String dtoOutboundDuration = outboundJourney.get("duration").asText();
        String dtoInboundDuration = inboundJourney.get("duration").asText();

        List<FlightDTO.Leg> dtoOutboundJourney = new ArrayList<>();
        for (int i = 0; i < outboundJourney.get("segments").size(); i++) {
            JsonNode outboundSegment = outboundJourney.get("segments").get(i);
            String departureTime = outboundSegment.get("departure").get("at").asText();
            String arrivalTime = outboundSegment.get("arrival").get("at").asText();
            String departureAirport = outboundSegment.get("departure").get("iataCode").asText();
            String arrivalAirport = outboundSegment.get("arrival").get("iataCode").asText();
            String duration = outboundSegment.get("duration").asText();

            FlightDTO.Leg outboundLeg = new FlightDTO.Leg(departureTime, arrivalTime, departureAirport, arrivalAirport, duration);
            dtoOutboundJourney.add(outboundLeg);
        }

        List<FlightDTO.Leg> dtoInboundJourney = new ArrayList<>();
        for (int i = 0; i < inboundJourney.get("segments").size(); i++) {
            JsonNode inboundSegment = inboundJourney.get("segments").get(i);
            String departureTime = inboundSegment.get("departure").get("at").asText();
            String arrivalTime = inboundSegment.get("arrival").get("at").asText();
            String departureAirport = inboundSegment.get("departure").get("iataCode").asText();
            String arrivalAirport = inboundSegment.get("arrival").get("iataCode").asText();
            String duration = inboundSegment.get("duration").asText();

            FlightDTO.Leg inboundLeg = new FlightDTO.Leg(departureTime, arrivalTime, departureAirport, arrivalAirport, duration);
            dtoInboundJourney.add(inboundLeg);
        }

        FlightDTO flightDTO = new FlightDTO(dtoPrice, dtoInboundJourney, dtoOutboundJourney, dtoInboundDuration, dtoOutboundDuration);

        return flightDTO;

    }

}