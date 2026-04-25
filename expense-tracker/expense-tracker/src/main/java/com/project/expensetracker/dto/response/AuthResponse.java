package com.project.expensetracker.dto.response;

public class AuthResponse {
    private Long userId;
    private String email;
    private String message;

    public AuthResponse(Long userId, String email, String message) {
        this.userId = userId;
        this.email = email;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }
}
