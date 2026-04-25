package com.project.expensetracker.dto.response;

public class BudgetStatusResponse {
    private String month;
    private Double totalExpenses;
    private Double budget;
    private Double remainingBudget;
    private Double percentageUsed;
    private Boolean budgetExceeded;
    private Double exceededBy;

    public BudgetStatusResponse(
            String month,
            Double totalExpenses,
            Double budget,
            Double remainingBudget,
            Double percentageUsed,
            Boolean budgetExceeded,
            Double exceededBy
    ) {
        this.month = month;
        this.totalExpenses = totalExpenses;
        this.budget = budget;
        this.remainingBudget = remainingBudget;
        this.percentageUsed = percentageUsed;
        this.budgetExceeded = budgetExceeded;
        this.exceededBy = exceededBy;
    }

    public String getMonth() {
        return month;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }

    public Double getBudget() {
        return budget;
    }

    public Double getRemainingBudget() {
        return remainingBudget;
    }

    public Double getPercentageUsed() {
        return percentageUsed;
    }

    public Boolean getBudgetExceeded() {
        return budgetExceeded;
    }

    public Double getExceededBy() {
        return exceededBy;
    }
}
