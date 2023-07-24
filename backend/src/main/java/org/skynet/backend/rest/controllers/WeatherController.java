package org.skynet.backend.rest.controllers;

import jakarta.websocket.server.PathParam;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.services.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    private WeatherService weatherService;

    @GetMapping("/weather")
    public WeatherDTO getWeather(@PathParam("lat") String lat, @PathParam("lon") String lon) {
        return weatherService.getWeatherDTO(lat, lon);
    }
}
