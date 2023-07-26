package org.skynet.backend.rest.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeatherDTO {
    private String time;
    private Double temp;
    private int code;
    private String desc;
}
