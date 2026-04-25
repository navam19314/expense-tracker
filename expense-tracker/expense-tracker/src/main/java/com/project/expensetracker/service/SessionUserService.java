package com.project.expensetracker.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SessionUserService {
    public static final String USER_ID = "USER_ID";

    public Long getRequiredUserId(HttpSession session) {
        Object userId = session.getAttribute(USER_ID);
        if (userId instanceof Long id) {
            return id;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login first.");
    }
}
