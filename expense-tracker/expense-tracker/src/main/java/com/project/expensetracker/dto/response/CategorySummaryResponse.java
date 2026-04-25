package com.project.expensetracker.dto.response;

public class CategorySummaryResponse {
    private String category;
    private Double totalAmount;

    public CategorySummaryResponse(String category, Double totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }

    public String getCategory() {
        return category;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }
}
