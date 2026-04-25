package com.project.expensetracker.controller;

import com.project.expensetracker.dto.request.BudgetRequest;
import com.project.expensetracker.dto.response.BudgetResponse;
import com.project.expensetracker.service.BudgetService;
import com.project.expensetracker.service.SessionUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    private final BudgetService budgetService;
    private final SessionUserService sessionUserService;

    public BudgetController(BudgetService budgetService, SessionUserService sessionUserService) {
        this.budgetService = budgetService;
        this.sessionUserService = sessionUserService;
    }

    @PostMapping
    public BudgetResponse add(@RequestBody BudgetRequest request, HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return budgetService.save(userId, request);
    }

    @GetMapping
    public List<BudgetResponse> getAll(HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return budgetService.list(userId);
    }
}