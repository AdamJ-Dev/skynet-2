package org.skynet.backend.auth;

import lombok.RequiredArgsConstructor;
import org.skynet.backend.persistence.entities.User;
import org.skynet.backend.persistence.repos.UserRepo;
import org.skynet.backend.persistence.roles.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public boolean authorize(Long id, String bearerToken) {
        String token = bearerToken.substring(7);
        User user = this.userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));
        String email = jwtService.extractUsername(token);
        return user.getEmail().equals(email);
    }
}
