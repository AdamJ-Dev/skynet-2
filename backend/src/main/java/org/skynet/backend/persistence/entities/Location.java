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
    @Column
    private Long locationId;
    @Column
    private String name;
    @Column
    private String relationship;
    @Column
    private double lat;
    @Column
    private double lon;

//    @JoinColumn(name = "programmeID", nullable = true)
//    @ManyToOne

    @Column
    private Long programmeId;
}