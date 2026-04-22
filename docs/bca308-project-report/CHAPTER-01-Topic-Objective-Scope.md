# Chapter 1 — Topic, Objective, and Scope

## 1.1 Topic of the Project

**Title:** *Web-Based Personal Expense Tracking System* (Expense Tracker)

The project is a **web application** that helps a user **organize personal spending** by recording transactions under **categories**, viewing them in a **list**, and optionally defining **monthly budget** amounts. The work reflects a **practical, user-centered** problem and can be extended later with authentication, reports, and charts.

**Future work (high level):** User registration and secure login, role-based access, spending charts, export to PDF/Excel, mobile-responsive enhancements, and deployment on a cloud host.

---

## 1.2 Objectives

1. To develop a **reliable** system to **add, list, and associate** expenses with categories and dates.  
2. To persist data in a **relational database** using **ORM** (JPA).  
3. To expose **RESTful HTTP APIs** for integration with a web front end.  
4. To provide a **clean, usable interface** for common tasks (add expense, view table, manage categories, set budget).  
5. To produce **standard documentation** (ERD, DFD, testing, report) as per BCA 308 requirements.

---

## 1.3 Scope

### 1.3.1 Functional scope

| Area | Description |
|------|-------------|
| Categories | Create and list category names per user (demo: user id 1). |
| Expenses | Add expense with amount, description, date, category; list expenses (optionally filtered by user). |
| Budgets | Set an amount for a given month (string label e.g. YYYY-MM); list budgets. |
| User (optional) | Model for user; basic auth API may exist for extension. |

### 1.3.2 Non-functional scope

- **Usability:** Clear navigation (sections: Add expense, View expenses, Categories, Budget).  
- **Maintainability:** Standard Spring Boot package layout.  
- **Portability:** Runs on any machine with JRE and MySQL (or H2 for demo).

### 1.3.3 Limitations (summary; see also `APPENDIX-B-Resources-Limitations.md`)

- Not a full **accounting** or **tax** system.  
- **Security** is suitable for project demo, not production (passwords, HTTPS hardening to be added in future work).  

---

## 1.4 How It Helps the End User

- **Clarity:** See all expenses in one place with **date, category, amount, and description**.  
- **Planning:** **Monthly budget** entries support comparing planned limits with actual spending (manual comparison in current version; automated comparison can be future work).  
- **Habit building:** Encourages **regular recording** of small expenses that otherwise go unnoticed.  

---

*In Word: use **Chapter heading** 20 pt centered for “Chapter 1” and underlined 14 pt left-aligned for “1.1 Topic of the Project” as per your appendix.*
