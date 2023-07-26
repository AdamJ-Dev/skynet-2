package org.skynet.backend.services;

import org.junit.jupiter.api.Test;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class WeatherServiceTest {

    private final String TEST_TIME = "2023-07-26";
    private final double TEST_MAX_TEMP = 25.1;
    private final double TEST_MIN_TEMP = 15.8;

    private final double TEST_TEMP = (TEST_MAX_TEMP + TEST_MIN_TEMP) / 2;
    private final int TEST_CODE = 3;
    private final String TEST_DESC = "Mainly clear, partly cloudy, and overcast";
    private final String TEST_BODY = String.format(
            "{\"daily\":{\"time\":[\"%s\"],\"weathercode\":[%s],\"temperature_2m_max\":[%s],\"temperature_2m_min\":[%s]}}",
            TEST_TIME, TEST_CODE, TEST_MAX_TEMP, TEST_MIN_TEMP);

    public WebClient.Builder builder = WebClient.builder()
            .exchangeFunction(clientRequest -> Mono.just(ClientResponse.create(HttpStatus.OK)
                    .header("content-type", "application/json")
                    .body(TEST_BODY)
                    .build()));

    private WeatherService weatherService = new WeatherService(builder);

    @Test
    public void testGetWeatherDTOs() {
        List<WeatherDTO> weatherDTOs = weatherService.getWeatherDTOs("", "", 1).block();
        WeatherDTO weatherDTO = weatherDTOs.get(0);
        assertEquals(weatherDTO.getTime(), TEST_TIME);
        assertEquals(weatherDTO.getTemp(), TEST_TEMP);
        assertEquals(weatherDTO.getCode(), TEST_CODE);
        assertEquals(weatherDTO.getDesc(), TEST_DESC);
    }
}
