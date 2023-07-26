package org.skynet.backend.rest.controllers;

import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

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
    public Mono<List<WeatherDTO>> getWeather(@RequestParam String lat, @RequestParam String lon, @RequestParam(required = false) Integer days) {
        return weatherService.getWeatherDTOs(lat, lon, days == null ? 16 : days);
    }
}
