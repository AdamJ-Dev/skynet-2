package org.skynet.backend.auth;

import lombok.RequiredArgsConstructor;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.persistence.roles.UserRole;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();
        User savedUser = userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .id(savedUser.getId())
                .token(jwtToken)
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var savedUser = userRepo.findByEmail(request.getEmail())
                .orElseThrow(); // todo handle exception here
        var jwtToken = jwtService.generateToken(savedUser);
        return AuthResponse.builder()
                .id(savedUser.getId())
                .token(jwtToken)
                .build();
    }
}
