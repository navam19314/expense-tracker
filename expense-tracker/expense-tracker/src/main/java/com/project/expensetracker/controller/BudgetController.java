package com.project.expensetracker.controller;

import com.project.expensetracker.model.Budget;
import com.project.expensetracker.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    private BudgetRepository repo;

    @PostMapping
    public Budget add(@RequestBody Budget b) {
        return repo.save(b);
    }

    @GetMapping
    public List<Budget> getAll() {
        return repo.findAll();
    }
}