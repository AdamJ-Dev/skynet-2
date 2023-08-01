package org.skynet.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor // for builder
@Entity
@Table(name = "programme")
public class Programme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private String since;
    @Column
    private String till;

    @JoinColumn(nullable = false, name = "channelId", referencedColumnName = "id")
    @ManyToOne
    private Channel channel;

    @JoinColumn(name = "programmeId", referencedColumnName = "id")
    @OneToMany
    private List<Location> locations ;

//    @Column
//    private String locationName;
//    @Column
//    private String locationRelationship;
//    @Column
//    private double locationLat;
//    @Column
//    private double locationLon;

}
