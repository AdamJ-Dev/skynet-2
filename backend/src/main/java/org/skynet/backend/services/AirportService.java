package org.skynet.backend.services;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ClientException;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.Location;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.skynet.backend.rest.dtos.AirportDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AirportService {
    private static String key = System.getenv("key");
    private static String secret = System.getenv("secret");
    static Amadeus amadeus = Amadeus.builder(key,secret).build();

    static ObjectMapper objectMapper = new ObjectMapper();

    public AirportDTO getNearestAirport(String lat, String lon) throws ResponseException, JsonProcessingException {
        Location[] locations;
        try{
            locations = amadeus.referenceData.locations.airports.get(Params
                    .with("latitude", lat)
                    .and("longitude", lon));
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

        String result = locations[0].getResponse().getBody();
        JsonNode resultJson = objectMapper.readTree(result);
        JsonNode airport = resultJson.get("data").get(0);
        String airportName = airport.get("name").asText();
        String airportCode = airport.get("iataCode").asText();

        return new AirportDTO(airportName, airportCode);
    }


}