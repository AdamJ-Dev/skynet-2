package org.skynet.backend.rest.controllers;

import lombok.RequiredArgsConstructor;
import org.skynet.backend.persistence.entities.Flight;
import org.skynet.backend.rest.dtos.UserDTO;
import org.skynet.backend.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PreAuthorize("@authService.authorize(#id, #bearerToken)")
    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable Long id, @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        return userService.getUser(id);
    }

    @PreAuthorize("@authService.authorize(#id, #bearerToken)")
    @PostMapping("/user/{id}/flights")
    public UserDTO postUserFlight(
            @PathVariable Long id,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken,
            @RequestBody Flight flight
    ) {
        return userService.postUserFlight(id, flight);
    }
}
