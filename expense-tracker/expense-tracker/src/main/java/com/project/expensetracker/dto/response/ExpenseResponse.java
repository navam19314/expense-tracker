package com.project.expensetracker.dto.response;

public class ExpenseResponse {
    private Long id;
    private Double amount;
    private String description;
    private String date;
    private Long categoryId;
    private String categoryName;

    public ExpenseResponse(Long id, Double amount, String description, String date, Long categoryId, String categoryName) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public Double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
