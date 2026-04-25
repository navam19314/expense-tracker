package com.project.expensetracker.service;

import com.project.expensetracker.dto.request.CategoryRequest;
import com.project.expensetracker.dto.response.CategoryResponse;
import com.project.expensetracker.model.Category;
import com.project.expensetracker.model.User;
import com.project.expensetracker.repository.CategoryRepository;
import com.project.expensetracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public CategoryResponse add(Long userId, CategoryRequest request) {
        String name = request.getName() == null ? "" : request.getName().trim();
        if (name.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name is required.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user."));
        Category category = new Category();
        category.setName(name);
        category.setUser(user);
        category = categoryRepository.save(category);
        return new CategoryResponse(category.getId(), category.getName());
    }

    public List<CategoryResponse> list(Long userId) {
        return categoryRepository.findByUserIdOrderByNameAsc(userId)
                .stream()
                .map(c -> new CategoryResponse(c.getId(), c.getName()))
                .toList();
    }
}
