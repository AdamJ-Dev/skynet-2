package org.skynet.backend.rest.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.skynet.backend.rest.dtos.UserDTO;
import org.skynet.backend.rest.dtos.WeatherDTO;
import org.skynet.backend.services.UserService;
import org.skynet.backend.services.WeatherService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable Long id, @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        return userService.getUser(id, bearerToken.substring(7));
    }

}
