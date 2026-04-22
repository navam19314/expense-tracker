package com.project.expensetracker.controller;

import com.project.expensetracker.model.User;
import com.project.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return userRepo.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(user.getEmail())
                        && u.getPassword().equals(user.getPassword()))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/test")
    public String test() {
        return "Working";
    }
}