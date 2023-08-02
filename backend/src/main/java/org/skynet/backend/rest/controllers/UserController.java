package org.skynet.backend.rest.controllers;

import lombok.RequiredArgsConstructor;
import org.skynet.backend.rest.dtos.UserDTO;
import org.skynet.backend.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PreAuthorize("@authService.authorize(#id, #bearerToken)")
    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable Long id, @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        return userService.getUser(id);
    }

}
