package org.skynet.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WeatherService {

    private final String URL_BASE = "https://api.openweathermap.org/data/2.5/";
    private String APPID;
    static final Logger logger = LoggerFactory.getLogger(WeatherService.class);

    public WeatherDTO getWeatherDTO(String lat, String lon) {
        String query = String.format("lat=%s&lon=%s&appid=%s", lat, lon, APPID);
        String weatherUrl = String.format("%sweather?%s", URL_BASE, query);
        String forecastUrl = String.format("%sforecast?%s", URL_BASE, query);
        JsonNode weatherNode = Utils.getJson(weatherUrl);
        JsonNode forecastNode = Utils.getJson(forecastUrl);
        WeatherDTO weatherDTO = new WeatherDTO();

        return weatherDTO;
    }

}
