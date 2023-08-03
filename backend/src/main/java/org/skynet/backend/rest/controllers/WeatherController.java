package org.skynet.backend.rest.controllers;

import lombok.RequiredArgsConstructor;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/weather")
    public List<WeatherDTO> getWeather(@RequestParam String lat, @RequestParam String lon, @RequestParam(required = false) Integer days) {
        return weatherService.getWeatherDTOs(lat, lon, days == null ? 16 : days).block();
    }
}
