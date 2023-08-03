package org.skynet.backend.services;

import org.modelmapper.ModelMapper;
import org.skynet.backend.exceptions.ProgrammeNotFoundException;
import org.skynet.backend.persistence.entities.Programme;
import org.skynet.backend.persistence.repos.ProgrammeRepo;
import org.skynet.backend.rest.dtos.ProgrammeDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
        return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ProgrammeDTO getProgrammeById(Long id){
        Optional<Programme> existingOptional = this.repo.findById(id);
        if(!existingOptional.isPresent())
            throw new ProgrammeNotFoundException();
        Programme existing = existingOptional.get();

        return this.mapToDTO(existing);
    }


}
