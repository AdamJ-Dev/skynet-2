package org.skynet.backend.services;

import org.modelmapper.ModelMapper;
import org.skynet.backend.persistence.entities.Programme;
import org.skynet.backend.persistence.repos.ProgrammeRepo;
import org.skynet.backend.rest.dtos.ProgrammeDTO;
import org.springframework.stereotype.Service;

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

    public List<ProgrammeDTO> getAllProgrammes(){
        List<ProgrammeDTO> programmeList = this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());

        return programmeList;
    }
//    public ProgrammeDTO getAllProgrammesById(Long id){
//        return this.mapToDTO(this.repo.getAllProgrammesWithLocationById(id));
//    }


}
