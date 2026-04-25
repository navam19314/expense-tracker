package com.project.expensetracker.service;

import com.project.expensetracker.dto.request.LoginRequest;
import com.project.expensetracker.dto.request.RegisterRequest;
import com.project.expensetracker.dto.response.AuthResponse;
import com.project.expensetracker.model.User;
import com.project.expensetracker.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request, HttpSession session) {
        String email = cleanEmail(request.getEmail());
        String password = cleanText(request.getPassword());

        if (email == null || password == null || password.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and strong password are required.");
        }
        if (userRepository.findByEmailIgnoreCase(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account already exists.");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user = userRepository.save(user);
        session.setAttribute(SessionUserService.USER_ID, user.getId());
        return new AuthResponse(user.getId(), user.getEmail(), "Registration successful.");
    }

    public AuthResponse login(LoginRequest request, HttpSession session) {
        String email = cleanEmail(request.getEmail());
        String password = cleanText(request.getPassword());
        if (email == null || password == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required.");
        }

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials.");
        }
        session.setAttribute(SessionUserService.USER_ID, user.getId());
        return new AuthResponse(user.getId(), user.getEmail(), "Login successful.");
    }

    public AuthResponse currentUser(HttpSession session) {
        Object userId = session.getAttribute(SessionUserService.USER_ID);
        if (!(userId instanceof Long id)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in.");
        }
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in."));
        return new AuthResponse(user.getId(), user.getEmail(), "Authenticated.");
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }

    private String cleanEmail(String value) {
        if (value == null) return null;
        String cleaned = value.trim().toLowerCase();
        return cleaned.isEmpty() ? null : cleaned;
    }

    private String cleanText(String value) {
        if (value == null) return null;
        String cleaned = value.trim();
        return cleaned.isEmpty() ? null : cleaned;
    }
}
