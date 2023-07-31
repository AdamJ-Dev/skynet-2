package org.skynet.backend.services;

import org.modelmapper.ModelMapper;
import org.skynet.backend.persistence.entities.Programme;
import org.skynet.backend.persistence.repos.ProgrammeRepo;
import org.skynet.backend.rest.dtos.ProgrammeDTO;
import org.skynet.backend.rest.dtos.ProgrammeLocationDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgrammeService {

    private ProgrammeRepo repo;

    private ModelMapper mapper;

    public ProgrammeService(ProgrammeRepo repo, ModelMapper mapper){
        super();
        this.repo = repo;
        this.mapper = mapper;
    }

    private ProgrammeDTO mapToDTO(Programme programme) {
        return this.mapper.map(programme, ProgrammeDTO.class);
    }

    public List<ProgrammeLocationDTO> getAllProgrammes(){
        List<ProgrammeDTO> testList = this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
        List<ProgrammeLocationDTO> finalList = new ArrayList<>();
        //testList.get(0).g
        for (ProgrammeDTO programDTO:testList
             ) {
            ProgrammeLocationDTO.Location location = new ProgrammeLocationDTO.Location(programDTO.getLocationLat(), programDTO.getLocationLon(), programDTO.getLocationName(), programDTO.getLocationRelationship());
            ProgrammeLocationDTO programmeLocationDTO = new ProgrammeLocationDTO(programDTO.getId(), programDTO.getTitle(), programDTO.getDescription(), programDTO.getSince(), programDTO.getTill(), programDTO.getChannelID(), location);
            finalList.add(programmeLocationDTO);
        }
        return finalList;
    }
//    public ProgrammeDTO getAllProgrammesById(Long id){
//        return this.mapToDTO(this.repo.getAllProgrammesWithLocationById(id));
//    }

//    public List<Location> getLocationsByProgrammeID(){
//
//    }
}
