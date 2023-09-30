package org.skynet.backend.rest.controllers;

import org.skynet.backend.rest.dtos.ChannelDTO;
import org.skynet.backend.services.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChannelController {

    private ChannelService service;

    @Autowired
    public ChannelController(ChannelService service){
        super();
        this.service = service;
    }

    @GetMapping("/channels")
    public List<ChannelDTO> getAllChannels(){
        return this.service.getAllChannels();
    }
}
