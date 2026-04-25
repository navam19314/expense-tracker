package com.project.expensetracker.controller;

import com.project.expensetracker.dto.request.LoginRequest;
import com.project.expensetracker.dto.request.RegisterRequest;
import com.project.expensetracker.dto.response.AuthResponse;
import com.project.expensetracker.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request, HttpSession session) {
        return authService.register(request, session);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request, HttpSession session) {
        return authService.login(request, session);
    }

    @GetMapping("/me")
    public AuthResponse me(HttpSession session) {
        return authService.currentUser(session);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        authService.logout(session);
        return ResponseEntity.ok(Map.of("message", "Logged out."));
    }
}