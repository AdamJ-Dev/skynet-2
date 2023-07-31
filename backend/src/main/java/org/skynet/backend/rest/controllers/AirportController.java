package org.skynet.backend.rest.controllers;

import com.amadeus.exceptions.ResponseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.websocket.server.PathParam;
import org.skynet.backend.rest.dtos.AirportDTO;
import org.skynet.backend.services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AirportController {
    private AirportService airportService;

    @Autowired
    public AirportController(AirportService airportService) {
        super();
        this.airportService = airportService;
    }

    @GetMapping("/airport")
    public AirportDTO getNearestAirport
            (@PathParam("lat") String lat,
             @PathParam("lon") String lon) throws ResponseException, JsonProcessingException {
        return this.airportService.getNearestAirport(lat, lon);
    }
}
