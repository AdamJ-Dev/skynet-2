package org.skynet.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

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

    private String getURL(String lat, String lon, int days) {
        String baseUrl = "https://api.open-meteo.com/v1/forecast";
        String query = "daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/London&forecast_days=" + days;
        return String.format("%s?latitude=%s&longitude=%s&%s",baseUrl, lat, lon, query);
    }

    public List<WeatherDTO> getWeatherDTOs(String lat, String lon) {
        int days = 16;
        JsonNode response = Utils.getJson(getURL(lat, lon, days));


        JsonNode daily = response.get("daily");
        JsonNode timeJson = daily.get("time");
        JsonNode maxTempJson = daily.get("temperature_2m_max");
        JsonNode minTempJson = daily.get("temperature_2m_min");
        JsonNode codeJson = daily.get("weathercode");

        List<WeatherDTO> weatherDTOs = new ArrayList<>();

        for(int i = 0; i < days; i++) {
            WeatherDTO weatherDTO = new WeatherDTO();

            String time = timeJson.get(i).asText();
            Double temp = (maxTempJson.get(i).asDouble() + minTempJson.get(i).asDouble()) / 2;
            int code = codeJson.get(i).asInt();
            String desc = DESC_MAP.get(code);

            weatherDTO.setTime(time);
            weatherDTO.setTemp(temp);
            weatherDTO.setCode(code);
            weatherDTO.setDesc(desc);
            weatherDTOs.add(weatherDTO);
        }

        return weatherDTOs;
    }
}
