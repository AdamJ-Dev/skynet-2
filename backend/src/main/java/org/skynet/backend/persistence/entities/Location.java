package org.skynet.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor // for builder
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LocationId;
    private String name;
    private String relationship;
    private double lat;
    private double lon;
//    @JoinColumn(name = "programmeID", nullable = true)
//    @ManyToOne
//    private Programme programme;
}