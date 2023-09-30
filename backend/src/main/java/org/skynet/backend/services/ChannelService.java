package org.skynet.backend.services;

import org.modelmapper.ModelMapper;
import org.skynet.backend.persistence.entities.Channel;
import org.skynet.backend.persistence.repos.ChannelRepo;
import org.skynet.backend.rest.dtos.ChannelDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChannelService {

    private ChannelRepo repo;

    private ModelMapper mapper;

    public ChannelService(ChannelRepo repo, ModelMapper mapper){
        super();
        this.repo = repo;
        this.mapper = mapper;
    }

    private ChannelDTO mapToDTO(Channel channel) {
        return this.mapper.map(channel, ChannelDTO.class);
    }

    public List<ChannelDTO> getAllChannels(){
        return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }
}
