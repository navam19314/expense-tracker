package com.project.expensetracker.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Budget> budgets = new ArrayList<>();

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public List<Expense> getExpenses() { return expenses; }

    public void setExpenses(List<Expense> expenses) { this.expenses = expenses; }

    public List<Category> getCategories() { return categories; }

    public void setCategories(List<Category> categories) { this.categories = categories; }

    public List<Budget> getBudgets() { return budgets; }

    public void setBudgets(List<Budget> budgets) { this.budgets = budgets; }
}