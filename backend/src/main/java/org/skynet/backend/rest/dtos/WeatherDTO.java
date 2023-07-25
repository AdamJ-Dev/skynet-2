package org.skynet.backend.rest.dtos;

import lombok.Data;

@Data
public class WeatherDTO {
    private String time;
    private Double temp;
    private int code;
    private String desc;
}
