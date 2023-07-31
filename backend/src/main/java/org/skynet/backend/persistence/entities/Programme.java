package org.skynet.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor // for builder
@Entity
@Table(name = "programme")
public class Programme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private String since;
    @Column
    private String till;
//    @JoinColumn(name = "locations")
//    @OneToMany
//    private List<Location> locations;
    @JoinColumn(nullable = false, name = "channelId", referencedColumnName = "id")
    @ManyToOne
    private Channel channel;

}
