package org.skynet.backend.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.IndexColumn;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Flight {

    @Data
    @NoArgsConstructor
    @Entity
    public static class Leg {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long legId;
        private String departureTime;
        private String arrivalTime;
        private String departureAirport;
        private String arrivalAirport;
        private String duration;
        @JsonIgnore
        @ManyToOne
        private Flight inboundFlight;

        @JsonIgnore
        @ManyToOne
        private Flight outboundFlight;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private Double price;

    private String inboundDuration;

    private String outboundDuration;

    private String homeCoordinates;
    
    private String awayCoordinates;

    @JsonIgnore
    @ManyToOne
    private User user;

    @OneToMany(
            mappedBy = "inboundFlight",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Leg> inboundLegs;

    @OneToMany(
            mappedBy = "outboundFlight",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Leg> outboundLegs;
}


