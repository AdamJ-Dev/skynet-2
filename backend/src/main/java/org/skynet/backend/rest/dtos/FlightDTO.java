package org.skynet.backend.rest.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class FlightDTO {

    @Data
    @AllArgsConstructor
    public static class Leg {
        private String departureTime;
        private String arrivalTime;
        private String departureAirport;
        private String arrivalAirport;
        private String duration;
    }

    private Double price;
    private List<Leg> inboundLegs;
    private List<Leg> outboundLegs;
    private String inboundDuration;
    private String outboundDuration;


}