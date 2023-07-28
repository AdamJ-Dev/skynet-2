package org.skynet.backend.rest.controllers;

import com.amadeus.exceptions.ResponseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.websocket.server.PathParam;
import org.skynet.backend.rest.dtos.FlightDTO;
import org.skynet.backend.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FlightController {
    private FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        super();
        this.flightService = flightService;
    }

    @GetMapping("/flights")
    public List<FlightDTO> getFlights
            (@PathParam("originLocationCode") String originLocationCode,
             @PathParam("destinationLocationCode") String destinationLocationCode,
             @PathParam("departureDate") String departureDate,
             @PathParam("returnDate") String returnDate,
             @PathParam("numberOfResults") int numberOfResults)
            throws ResponseException, JsonProcessingException {
        return this.flightService.getMultipleFlightDTOs
                (originLocationCode, destinationLocationCode, departureDate, returnDate, numberOfResults);
    }

}