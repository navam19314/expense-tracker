package com.project.expensetracker.controller;

import com.project.expensetracker.model.Expense;
import com.project.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository repo;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repo.save(expense);
    }

    @GetMapping
    public List<Expense> getAll(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return repo.findByUserIdOrderByIdDesc(userId);
        }
        return repo.findAll();
    }
}