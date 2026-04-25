package com.project.expensetracker.repository;

import com.project.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserIdOrderByIdDesc(Long userId);

    @Query("""
            select coalesce(sum(e.amount), 0)
            from Expense e
            where e.user.id = :userId
              and e.date like concat(:month, '%')
            """)
    Double sumByUserIdAndMonth(@Param("userId") Long userId, @Param("month") String month);

    @Query("""
            select c.name as categoryName, coalesce(sum(e.amount), 0) as totalAmount
            from Expense e
            join e.category c
            where e.user.id = :userId
              and e.date like concat(:month, '%')
            group by c.name
            order by totalAmount desc
            """)
    List<CategorySummaryProjection> findCategorySummary(@Param("userId") Long userId, @Param("month") String month);
}