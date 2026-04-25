package com.project.expensetracker.controller;

import com.project.expensetracker.dto.request.ExpenseRequest;
import com.project.expensetracker.dto.response.BudgetStatusResponse;
import com.project.expensetracker.dto.response.CategorySummaryResponse;
import com.project.expensetracker.dto.response.ExpenseResponse;
import com.project.expensetracker.service.ExpenseService;
import com.project.expensetracker.service.SessionUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final SessionUserService sessionUserService;

    public ExpenseController(ExpenseService expenseService, SessionUserService sessionUserService) {
        this.expenseService = expenseService;
        this.sessionUserService = sessionUserService;
    }

    @PostMapping
    public ExpenseResponse addExpense(@RequestBody ExpenseRequest request, HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return expenseService.add(userId, request);
    }

    @GetMapping
    public List<ExpenseResponse> getAll(HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return expenseService.list(userId);
    }

    @GetMapping("/category-summary")
    public List<CategorySummaryResponse> categorySummary(
            @RequestParam(required = false) String month,
            HttpSession session
    ) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return expenseService.categorySummary(userId, month);
    }

    @GetMapping("/budget-status")
    public BudgetStatusResponse budgetStatus(
            @RequestParam(required = false) String month,
            HttpSession session
    ) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return expenseService.budgetStatus(userId, month);
    }
}