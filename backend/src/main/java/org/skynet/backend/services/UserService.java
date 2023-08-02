package org.skynet.backend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.skynet.backend.auth.JwtService;
import org.skynet.backend.exceptions.UserNotFoundException;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.rest.dtos.FlightDTO;
import org.skynet.backend.rest.dtos.UserDTO;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    private UserDTO mapToDTO(User user) {
        return this.modelMapper.map(user, UserDTO.class);
    }

    public UserDTO getUser(Long id) {
        User user = this.userRepo.findById(id).orElseThrow(() -> new UserNotFoundException());
        return this.mapToDTO(user);
    }
}
