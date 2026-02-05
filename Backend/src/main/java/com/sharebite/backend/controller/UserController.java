package com.sharebite.backend.controller;

import com.sharebite.backend.dto.UserDTO;
import com.sharebite.backend.model.User;
import com.sharebite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User-related endpoints.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User u = userRepository.findByEmail(email).orElseThrow();
        UserDTO dto = new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getRole());
        return ResponseEntity.ok(dto);
    }
}
