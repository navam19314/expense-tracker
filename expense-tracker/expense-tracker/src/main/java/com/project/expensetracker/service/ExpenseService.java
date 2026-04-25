package com.project.expensetracker.service;

import com.project.expensetracker.dto.request.ExpenseRequest;
import com.project.expensetracker.dto.response.BudgetStatusResponse;
import com.project.expensetracker.dto.response.CategorySummaryResponse;
import com.project.expensetracker.dto.response.ExpenseResponse;
import com.project.expensetracker.model.Budget;
import com.project.expensetracker.model.Category;
import com.project.expensetracker.model.Expense;
import com.project.expensetracker.model.User;
import com.project.expensetracker.repository.CategoryRepository;
import com.project.expensetracker.repository.ExpenseRepository;
import com.project.expensetracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetService budgetService;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            BudgetService budgetService
    ) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.budgetService = budgetService;
    }

    public ExpenseResponse add(Long userId, ExpenseRequest request) {
        if (request.getAmount() == null || request.getAmount() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valid expense amount is required.");
        }

        String date = request.getDate() == null ? "" : request.getDate().trim();
        if (date.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expense date is required.");
        }
        validateIsoDate(date);

        if (request.getCategoryId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category is required.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user."));

        Category category = categoryRepository.findByIdAndUserId(request.getCategoryId(), userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category."));

        Expense expense = new Expense();
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription() == null || request.getDescription().trim().isEmpty()
                ? "-"
                : request.getDescription().trim());
        expense.setDate(date);
        expense.setUser(user);
        expense.setCategory(category);
        expense = expenseRepository.save(expense);

        return toResponse(expense);
    }

    public List<ExpenseResponse> list(Long userId) {
        return expenseRepository.findByUserIdOrderByIdDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<CategorySummaryResponse> categorySummary(Long userId, String month) {
        String resolvedMonth = resolveMonth(month);
        return expenseRepository.findCategorySummary(userId, resolvedMonth)
                .stream()
                .map(row -> new CategorySummaryResponse(row.getCategoryName(), safe(row.getTotalAmount())))
                .toList();
    }

    public BudgetStatusResponse budgetStatus(Long userId, String month) {
        String resolvedMonth = resolveMonth(month);
        double totalExpenses = safe(expenseRepository.sumByUserIdAndMonth(userId, resolvedMonth));
        Budget budget = budgetService.findLatestByMonth(userId, resolvedMonth).orElse(null);
        double budgetAmount = budget != null && budget.getAmount() != null ? budget.getAmount() : 0.0;
        double remaining = budgetAmount - totalExpenses;
        boolean exceeded = budgetAmount > 0 && totalExpenses > budgetAmount;
        double exceededBy = exceeded ? totalExpenses - budgetAmount : 0.0;
        double percentageUsed = budgetAmount > 0 ? (totalExpenses / budgetAmount) * 100 : 0;

        return new BudgetStatusResponse(
                resolvedMonth,
                round2(totalExpenses),
                round2(budgetAmount),
                round2(remaining),
                round2(percentageUsed),
                exceeded,
                round2(exceededBy)
        );
    }

    private ExpenseResponse toResponse(Expense e) {
        return new ExpenseResponse(
                e.getId(),
                e.getAmount(),
                e.getDescription(),
                e.getDate(),
                e.getCategory().getId(),
                e.getCategory().getName()
        );
    }

    private String resolveMonth(String month) {
        if (month == null || month.isBlank()) {
            return LocalDate.now().toString().substring(0, 7);
        }
        if (!month.matches("\\d{4}-\\d{2}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Month must be in YYYY-MM format.");
        }
        return month;
    }

    private void validateIsoDate(String date) {
        try {
            LocalDate.parse(date);
        } catch (DateTimeParseException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date must be in YYYY-MM-DD format.");
        }
    }

    private double safe(Double value) {
        return value == null ? 0.0 : value;
    }

    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
