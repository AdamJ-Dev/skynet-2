package org.skynet.backend;


import org.skynet.backend.services.WeatherService;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
//        SpringApplication.run(BackendApplication.class, args);
        WeatherService weatherService = new WeatherService();
        weatherService.getWeatherDTO("44.34", "10.99");
    }
}