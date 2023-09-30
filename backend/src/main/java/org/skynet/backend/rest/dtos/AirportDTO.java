package org.skynet.backend.rest.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportDTO {

    private String name;
    private String airportCode;
    private String coordinates;
}
