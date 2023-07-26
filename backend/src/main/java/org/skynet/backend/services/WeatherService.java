package org.skynet.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    static final Logger logger = LoggerFactory.getLogger(WeatherService.class);

    static final Map<Integer, String> DESC_MAP = Map.ofEntries(
            Map.entry(0, "Clear sky"),
            Map.entry(1, "Mainly clear, partly cloudy, and overcast"),
            Map.entry(2, "Mainly clear, partly cloudy, and overcast"),
            Map.entry(3, "Mainly clear, partly cloudy, and overcast"),
            Map.entry(45, "Fog and depositing rime fog"),
            Map.entry(48, "Fog and depositing rime fog"),
            Map.entry(51, "Drizzle: Light, moderate, and dense intensity"),
            Map.entry(53, "Drizzle: Light, moderate, and dense intensity"),
            Map.entry(55, "Drizzle: Light, moderate, and dense intensity"),
            Map.entry(56, "Freezing Drizzle: Light and dense intensity"),
            Map.entry(57, "Freezing Drizzle: Light and dense intensity"),
            Map.entry(61, "Rain: Slight, moderate and heavy intensity"),
            Map.entry(63, "Rain: Slight, moderate and heavy intensity"),
            Map.entry(65, "Rain: Slight, moderate and heavy intensity"),
            Map.entry(66, "Freezing Rain: Light and heavy intensity"),
            Map.entry(67, "Freezing Rain: Light and heavy intensity"),
            Map.entry(71, "Snow fall: Slight, moderate, and heavy intensity"),
            Map.entry(73, "Snow fall: Slight, moderate, and heavy intensity"),
            Map.entry(75, "Snow fall: Slight, moderate, and heavy intensity"),
            Map.entry(77, "Snow grains"),
            Map.entry(80, "Rain showers: Slight, moderate, and violent"),
            Map.entry(81, "Rain showers: Slight, moderate, and violent"),
            Map.entry(82, "Rain showers: Slight, moderate, and violent"),
            Map.entry(85, "Snow showers slight and heavy"),
            Map.entry(86, "Snow showers slight and heavy"),
            Map.entry(95, "Thunderstorm: Slight or moderate"),
            Map.entry(96, "Thunderstorm with slight and heavy hail"),
            Map.entry(99, "Thunderstorm with slight and heavy hail")
    );

    private WebClient.Builder builder;

    @Autowired
    public WeatherService(WebClient.Builder builder) {
        super();
        this.builder = builder;
    }

    private String getApiUrl(String lat, String lon, int days) {
        String baseUrl = "https://api.open-meteo.com/v1/forecast";
        String query = "daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/London&forecast_days=" + days;
        return String.format("%s?latitude=%s&longitude=%s&%s",baseUrl, lat, lon, query);
    }

    public Mono<List<WeatherDTO>> getWeatherDTOs(String lat, String lon, int days) {
        return builder.build()
                .get()
                .uri(getApiUrl(lat, lon, days))
                .retrieve()
                .onStatus(status -> status.isError(), response -> {
                    HttpStatusCode code = response.statusCode();
                    return response.bodyToMono(JsonNode.class).map(body -> {
                        String reason = body.get("reason").asText();
                        return new ResponseStatusException(code, reason);
                    });
                })
                .bodyToMono(JsonNode.class)
                .map(response -> {
                    JsonNode dailyJson = response.get("daily");
                    JsonNode timeJson = dailyJson.get("time");
                    JsonNode maxTempJson = dailyJson.get("temperature_2m_max");
                    JsonNode minTempJson = dailyJson.get("temperature_2m_min");
                    JsonNode codeJson = dailyJson.get("weathercode");

                    List<WeatherDTO> weatherDTOs = new ArrayList<>();

                    for(int i = 0; i < days; i++) {
                        String time = timeJson.get(i).asText();
                        Double temp = (maxTempJson.get(i).asDouble() + minTempJson.get(i).asDouble()) / 2;
                        int code = codeJson.get(i).asInt();
                        String desc = DESC_MAP.get(code);

                        weatherDTOs.add(new WeatherDTO(time, temp, code, desc));
                    }

                    return weatherDTOs;
                });
    }
}
