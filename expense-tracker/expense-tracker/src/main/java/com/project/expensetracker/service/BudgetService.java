package com.project.expensetracker.service;

import com.project.expensetracker.dto.request.BudgetRequest;
import com.project.expensetracker.dto.response.BudgetResponse;
import com.project.expensetracker.model.Budget;
import com.project.expensetracker.model.User;
import com.project.expensetracker.repository.BudgetRepository;
import com.project.expensetracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public BudgetResponse save(Long userId, BudgetRequest request) {
        String month = request.getMonth() == null ? "" : request.getMonth().trim();
        Double amount = request.getAmount();
        if (month.isBlank() || amount == null || amount < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valid month and budget amount are required.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user."));
        Budget budget = new Budget();
        budget.setMonth(month);
        budget.setAmount(amount);
        budget.setUser(user);
        budget = budgetRepository.save(budget);
        return new BudgetResponse(budget.getId(), budget.getMonth(), budget.getAmount());
    }

    public List<BudgetResponse> list(Long userId) {
        return budgetRepository.findByUserIdOrderByIdDesc(userId)
                .stream()
                .map(b -> new BudgetResponse(b.getId(), b.getMonth(), b.getAmount()))
                .toList();
    }

    public Optional<Budget> findLatestByMonth(Long userId, String month) {
        return budgetRepository.findFirstByUserIdAndMonthOrderByIdDesc(userId, month);
    }
}
