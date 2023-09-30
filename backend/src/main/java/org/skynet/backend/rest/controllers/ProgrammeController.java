package org.skynet.backend.rest.controllers;

import org.skynet.backend.rest.dtos.ProgrammeDTO;
import org.skynet.backend.services.ProgrammeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProgrammeController {

    private ProgrammeService service;

    @Autowired
    public ProgrammeController(ProgrammeService service){
        super();
        this.service = service;
    }

    @GetMapping("/programmes")
    public List<ProgrammeDTO> getAllProgrammes(){
        return this.service.getAllProgrammes();
    }

    @GetMapping("/programmes/{id}")
    public ProgrammeDTO getProgrammeById(@PathVariable Long id){
        return this.service.getProgrammeById(id);
    }
}
