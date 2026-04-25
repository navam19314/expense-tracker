package com.project.expensetracker.repository;

import com.project.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserIdOrderByIdDesc(Long userId);
    Optional<Budget> findFirstByUserIdAndMonthOrderByIdDesc(Long userId, String month);
}