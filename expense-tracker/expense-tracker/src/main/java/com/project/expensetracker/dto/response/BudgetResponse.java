package com.project.expensetracker.dto.response;

public class BudgetResponse {
    private Long id;
    private String month;
    private Double amount;

    public BudgetResponse(Long id, String month, Double amount) {
        this.id = id;
        this.month = month;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public String getMonth() {
        return month;
    }

    public Double getAmount() {
        return amount;
    }
}
