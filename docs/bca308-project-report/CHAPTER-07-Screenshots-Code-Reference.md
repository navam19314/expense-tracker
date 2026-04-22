# Chapter 7 — Coding, Screenshots, and Code Reference

> This file is a **checklist** for the **~75 page** report. **Screenshots and long code** belong in Word, not all in this repo.

## 7.1 Screenshot Checklist (Insert in Word)

| # | Suggested caption | What to capture |
|---|-------------------|-----------------|
| Fig 7.1 | Main application – Add Expense | Full browser window, URL bar `localhost:8080` |
| Fig 7.2 | View Expenses | Table with sample data |
| Fig 7.3 | Categories | Pills and add form |
| Fig 7.4 | Budget | Month + amount and list |
| Fig 7.5 | **Network tab** (optional) | `POST /api/expenses` with status 200 |
| Fig 7.6 | **H2 console** (optional) | If using dev profile; show tables |
| Fig 7.7 | **MySQL Workbench** (optional) | `expense_tracker` schema and sample rows |

**Tip:** Use **Win+Shift+S** (Windows) or **Cmd+Shift+4** (macOS), paste into Word, **compress** images if the file size is huge.

---

## 7.2 Code to Include in Report (Excerpts Only)

1. **Main class** – `ExpenseTrackerApplication.java` (8–12 lines).  
2. **One entity** – e.g. `Expense.java` (fields + annotations).  
3. **One repository** – e.g. `ExpenseRepository` with one custom method.  
4. **One controller** – e.g. `GET` and `POST` in `ExpenseController`.  
5. **Client** – one `fetch()` call from `app.js` (add expense).  

*Label each: **Code 7.1, Code 7.2**, etc., Courier New 10 pt.*

---

## 7.3 Full Source Code

- **Option A:** Zip the `src` folder and keep with project submission if allowed.  
- **Option B:** **Appendix** in report with file list only (file tree printout).  
- **Option C:** GitHub / GitLab link (only if your college permits public URL in references).

---

## 7.4 Project Structure (for Report)

> Adjust paths to your actual tree.

```
expense-tracker/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/.../expensetracker/
    │   │   ├── ExpenseTrackerApplication.java
    │   │   ├── controller/
    │   │   ├── model/
    │   │   └── repository/
    │   └── resources/
    │       ├── application.properties
    │       ├── application-dev.properties   (if present)
    │       └── static/
    │           ├── index.html
    │           ├── style.css
    │           └── app.js
    └── test/...
```

---

*Use this chapter to reach page count with **narrative** about each figure and each code snippet (what it does, why it matters).*
