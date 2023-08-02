package org.skynet.backend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.skynet.backend.exceptions.UserNotFoundException;
import org.skynet.backend.persistence.entities.Flight;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.FlightRepo;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.rest.dtos.UserDTO;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final FlightRepo flightRepo;
    private final ModelMapper modelMapper;

    private UserDTO mapToDTO(User user) {
        return this.modelMapper.map(user, UserDTO.class);
    }

    public UserDTO getUser(Long id) {
        User user = this.userRepo.findById(id).orElseThrow(UserNotFoundException::new);
        return this.mapToDTO(user);
    }

    public UserDTO postUserFlight(Long id, Flight flight) {
        User user = this.userRepo.findById(id).orElseThrow(UserNotFoundException::new);
        flight.setUser(user);
        this.flightRepo.save(flight);
        User updatedUser = this.userRepo.findById(id).orElseThrow(UserNotFoundException::new);
        return this.mapToDTO(updatedUser);
    }
}
