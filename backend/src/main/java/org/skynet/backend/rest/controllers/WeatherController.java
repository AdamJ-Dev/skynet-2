package org.skynet.backend.rest.controllers;

import jakarta.websocket.server.PathParam;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WeatherController {

    private WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {
        super();
        this.weatherService = weatherService;
    }

    @GetMapping("/weather")
    public List<WeatherDTO> getWeather(@PathParam("lat") String lat, @PathParam("lon") String lon) {
        return weatherService.getWeatherDTOs(lat, lon);
    }
}
