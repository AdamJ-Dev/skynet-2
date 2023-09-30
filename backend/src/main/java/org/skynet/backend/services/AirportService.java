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

import java.util.ArrayList;
import java.util.List;

@Service
public class AirportService {
    private static String key = System.getenv("AMADEUS_KEY");
    private static String secret = System.getenv("AMADEUS_SECRET");
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


        return airportLocationToDTO(locations);
    }

    public AirportDTO airportLocationToDTO(Location[] locations) {
        Location location = locations[0];
        return new AirportDTO(location.getName(), location.getIataCode(), getAirportCoordinates(location));
    }

    public String getAirportCoordinates(Location airport) {
        Double lat = airport.getGeoCode().getLatitude();
        Double lon = airport.getGeoCode().getLongitude();
        return String.format("%f,%f", lat, lon);
    }

    public List<AirportDTO> getAirportsMatchingSearch(String search) throws ResponseStatusException {
        try {
            Location[] airports = amadeus.referenceData.locations.get(
                    Params.with("keyword", search).and("subType", "AIRPORT"));
            List<AirportDTO> airportDTOs = new ArrayList<>();
            for (Location airport : airports) {
                AirportDTO airportDTO = new AirportDTO(airport.getName(), airport.getIataCode(), getAirportCoordinates(airport));
                airportDTOs.add(airportDTO);
            }
            return airportDTOs;
        } catch (ResponseException e) {
            HttpStatus statusCode = HttpStatus.valueOf(e.getResponse().getStatusCode());
            throw new ResponseStatusException(statusCode, e.getDescription());
        }
    }
}
