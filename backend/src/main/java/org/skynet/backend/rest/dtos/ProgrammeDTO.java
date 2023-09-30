package org.skynet.backend.rest.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgrammeDTO {

    private Long id;
    private String title;
    private String description;
    private String since;
    private String till;
    private List<LocationDTO> locations;
    private Long channelId;

}
