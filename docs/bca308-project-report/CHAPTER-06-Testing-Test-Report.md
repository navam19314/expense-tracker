# Chapter 6 — Testing Methodology and Test Report

## 6.1 Testing Objectives

- Verify that **categories**, **expenses**, and **budgets** can be **created** and **listed** without errors.  
- Verify **REST APIs** return expected **HTTP status** and **JSON** bodies.  
- Verify **UI** messages and table contents match saved data.

---

## 6.2 Types of Testing Used

| Type | Description |
|------|-------------|
| **Manual functional testing** | Perform flows in the browser as an end user. |
| **API testing** (optional) | Postman `GET/POST` on `/api/*` endpoints. |
| **Smoke test** | Spring Boot `contextLoads()` test ensures application context starts (when DB is available). |

---

## 6.3 Sample Test Cases (for Test Report Table)

> Copy into Word as **Table 6.1** with columns: Test ID, Objective, Steps, Expected, Actual, Pass/Fail.

| Test ID | Objective | Steps | Expected result |
|---------|-------------|-------|-----------------|
| TC-01 | Add category | Go to Categories → enter name → Add | Success feedback; category appears in list |
| TC-02 | Add expense | Add expense → fill amount, date, category → Save | Success message; total summary updates |
| TC-03 | View expenses | Open View expenses | Table shows rows with date, category, amount, description |
| TC-04 | Add budget | Budget → select month → amount → Save | Budget appears in list |
| TC-05 | Invalid expense | Missing amount or category → Save | Validation message / no silent failure |
| TC-06 | API GET | `GET /api/expenses?userId=1` | JSON array; status 200 |

**Actual result & date:** Fill during testing; sign in viva that you executed these on **[date]**.

---

## 6.4 Test Report Summary (Template Paragraph)

*“Testing was carried out during [dates]. All test cases TC-01 to TC-06 were executed. [N] passed; [M] failed initially and were fixed by [brief fix]. The system is considered functionally stable for the project demonstration.”*

---

## 6.5 Code Sheet (Guidance)

- **Code sheet** = listing of **important** source files with **line numbers** or **package names** as per college format.  
- Usually includes: one **entity** class, one **repository** interface, one **controller** class, and a **short excerpt** of `app.js` for `fetch` calls.  
- **Courier New, 10 pt** for code blocks in Word; keep snippets **short**; full project can be on **CD / pen drive** if the department allows.

---

*Add **Fig 6.1** – Screenshot of Postman (if used) or Network tab showing a successful `POST`.*
