package com.project.expensetracker.controller;

import com.project.expensetracker.dto.request.CategoryRequest;
import com.project.expensetracker.dto.response.CategoryResponse;
import com.project.expensetracker.service.CategoryService;
import com.project.expensetracker.service.SessionUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final SessionUserService sessionUserService;

    public CategoryController(CategoryService categoryService, SessionUserService sessionUserService) {
        this.categoryService = categoryService;
        this.sessionUserService = sessionUserService;
    }

    @PostMapping
    public CategoryResponse add(@RequestBody CategoryRequest request, HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return categoryService.add(userId, request);
    }

    @GetMapping
    public List<CategoryResponse> getAll(HttpSession session) {
        Long userId = sessionUserService.getRequiredUserId(session);
        return categoryService.list(userId);
    }
}