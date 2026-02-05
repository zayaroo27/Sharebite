package com.sharebite.backend.service;

import com.sharebite.backend.dto.AuthResponse;
import com.sharebite.backend.dto.LoginRequest;
import com.sharebite.backend.dto.RegisterRequest;
import com.sharebite.backend.dto.UserDTO;
import com.sharebite.backend.model.User;
import com.sharebite.backend.repository.UserRepository;
import com.sharebite.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service handling registration and login logic.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public UserDTO register(RegisterRequest req) {
        Optional<User> existing = userRepository.findByEmail(req.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        User u = new User(req.getName(), req.getEmail(), passwordEncoder.encode(req.getPassword()), req.getRole());
        userRepository.save(u);
        return new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getRole());
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User user = userRepository.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        UserDTO dto = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
        return new AuthResponse(token, dto);
    }
}
