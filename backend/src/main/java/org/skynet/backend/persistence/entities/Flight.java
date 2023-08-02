package org.skynet.backend.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Flight {

//    @Data
//    @NoArgsConstructor
//    @Entity
//    public static class Leg {
//        @Id
//        @GeneratedValue(strategy = GenerationType.IDENTITY)
//        private Long legId;
//        private Long flightId;
//        @Enumerated(EnumType.STRING)
//        private String legType;
//        private String departureTime;
//        private String arrivalTime;
//        private String departureAirport;
//        private String arrivalAirport;
//        private String duration;
//
//        private enum LegType {
//            INBOUND,
//            OUTBOUND
//        }
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private Double price;

    private String inboundDuration;

    private String outboundDuration;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}


