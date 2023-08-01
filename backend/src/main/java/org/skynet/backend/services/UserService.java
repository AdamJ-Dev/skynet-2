package org.skynet.backend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.skynet.backend.auth.JwtService;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.rest.dtos.UserDTO;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    private UserDTO mapToDTO(User user) {
        return this.modelMapper.map(user, UserDTO.class);
    }

    public UserDTO getUser(Long id, String token) {
        User savedUser = this.userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        String email = jwtService.extractUsername(token);
        if (!savedUser.getEmail().equals(email)) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return this.mapToDTO(savedUser);
    }
}
