package com.project.expensetracker.controller;

import com.project.expensetracker.model.Category;
import com.project.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository repo;

    @PostMapping
    public Category add(@RequestBody Category c) {
        return repo.save(c);
    }

    @GetMapping
    public List<Category> getAll(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return repo.findByUserIdOrderByNameAsc(userId);
        }
        return repo.findAll();
    }
}