package org.skynet.backend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.skynet.backend.exceptions.UserNotFoundException;
import org.skynet.backend.persistence.entities.Flight;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.rest.dtos.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
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
        List<Flight.Leg> inboundLegs = flight.getInboundLegs();
        List<Flight.Leg> outboundLegs = flight.getOutboundLegs();

        if (inboundLegs != null) {
            for (Flight.Leg leg : inboundLegs) {
                leg.setInboundFlight(flight);
            }
        }

        if (outboundLegs != null) {
            for (Flight.Leg leg : outboundLegs) {
                leg.setOutboundFlight(flight);
            }
        }
        flight.setUser(user);
        user.getFlights().add(flight);
        User savedUser = this.userRepo.save(user);
        return this.mapToDTO(savedUser);
    }
}
