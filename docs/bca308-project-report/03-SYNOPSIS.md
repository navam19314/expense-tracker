# Synopsis (Summary / Abstract)

> **Target length in final submission:** 3–4 pages (Word, double-spaced).  
> This Markdown is **denser**; expand each subsection with 1–2 short paragraphs when you typeset.

**Project title:** Web-Based Personal Expense Tracking System  
**Also known as:** Expense Tracker (Application)  
**Student:** [Name] | **Roll No.:** [—] | **Guide:** [Name] | **Institution:** [College]

---

## 1. Statement about the Problem

Students and young professionals often spend money on many small transactions (food, travel, stationery, entertainment) without recording them. Over a month, this leads to uncertainty about **where money went**, whether a **monthly budget** was respected, and how spending is **distributed across categories**. Paper diaries and spreadsheets are either inconvenient or require technical comfort with formulas and charts.

There is a need for a **simple, focused application** that lets a user:

- Define **categories** of spending  
- **Log expenses** with amount, date, and description  
- **View** a consolidated list of expenses  
- Optionally set a **monthly budget** for planning  

The problem addressed by this project is: **lack of an easy, web-accessible tool** (suitable for a college project demo) that combines data storage, basic reporting through lists and totals, and a clear user interface—without unnecessary complexity.

---

## 2. Why This Topic Is Chosen

This topic was chosen because it:

- Relates to **daily life** (personal finance) and is easy to explain to examiners.  
- Allows demonstration of **core software engineering topics**: requirements, database design (ER), layered architecture (web + API + database), and testing.  
- Fits well with **BCA-level** skills: web technologies, programming, and databases.  
- Can be **extended** in future (login, charts, export, mobile app), showing scope for learning beyond the current submission.  

---

## 3. Objective and Scope of the Project

### 3.1 Objectives

1. To design and implement a **web-based expense tracking system** that stores user-related data reliably.  
2. To allow users to **create categories**, **add expenses** (amount, description, date, category), **view expenses** in a tabular form, and **set monthly budgets**.  
3. To use a **modern server-side framework** (Spring Boot) with a **relational database** and a **browser-based front end**.  
4. To document the system using **analysis and design artifacts** (e.g. DFD, ERD) and **test** key functions.

### 3.2 Scope

**In scope:**

- Single-user or **demo user** scenario (e.g. user id `1`) for classroom demonstration.  
- CRUD-oriented features for **expenses**, **categories**, and **budgets** through REST APIs.  
- Static **HTML, CSS, JavaScript** client served by the same application.  
- Database persistence with **JPA/Hibernate** (MySQL in production profile; optional in-memory **H2** for development).

**Out of scope (optional future work):**

- Full **multi-user authentication** with password recovery (basic auth API may exist; full UI registration is optional).  
- **Payment gateway** or bank integration.  
- **Native mobile** applications.  
- Advanced **analytics** and PDF/Excel export (can be listed under “future scope”).

---

## 4. Methodology (Summary of the Project)

The project follows a **structured, incremental** approach:

1. **Requirement gathering** — Features for categories, expenses, budgets, and views.  
2. **Analysis** — Identify entities (User, Category, Expense, Budget) and relationships.  
3. **Design** — ERD, DFD (context and first level), and screen layout for the web UI.  
4. **Implementation** — Spring Boot REST controllers, JPA repositories, MySQL/H2, static web resources.  
5. **Testing** — Manual functional testing of APIs and UI; sample test cases documented.  
6. **Documentation** — Report, synopsis, screenshots, and code listing as per BCA 308 norms.

---

## 5. Hardware & Software to Be Used

### 5.1 Hardware (typical)

- PC or laptop with **4 GB RAM** (8 GB recommended), sufficient disk space, network access for development.  
- For deployment demo: same machine or lab server running the Spring Boot application.

### 5.2 Software

| Category | Software / Technology |
|----------|------------------------|
| Language | Java (e.g. 17) |
| Framework | Spring Boot 3.x |
| Persistence | Spring Data JPA, Hibernate |
| Database | MySQL 8.x (primary); H2 (optional dev profile) |
| Build | Apache Maven |
| Client | HTML5, CSS3, JavaScript (static) |
| IDE | IntelliJ IDEA / Eclipse / VS Code / Cursor |
| API testing (optional) | Postman, browser DevTools |

---

## 6. Testing Technologies Used

- **Manual testing** through the browser: add category → add expense → view list → add budget.  
- **Browser developer tools** (Network tab) to verify REST calls and responses.  
- Optional: **Postman** for `GET/POST` on `/api/expenses`, `/api/categories`, `/api/budget`.  
- **JUnit** (Spring Boot test starter) available for context load test; extend with unit tests if required by the guide.

---

## 7. Contribution of the Project

1. **For the user:** A clear, web-based way to **record and review** personal expenses and **set budgets** by month.  
2. **For academic evaluation:** Demonstrates **full-stack** structure (UI → REST → service layer via controllers → repository → DB), **data modeling**, and **project documentation** (synopsis, report, diagrams).  
3. **For the student:** Hands-on experience with **Spring Boot**, **RESTful design**, **JPA**, and **deployment** of a standalone JAR or IDE-run application.

---

## 8. Innovation & Unique Aspects (Brief)

- **Single-stack deployment:** Browser UI and APIs served from one Spring Boot process—simple to run for viva.  
- **Scoping by user id** in API design prepares the system for future **multi-user** use.  
- **Layered code** (`model`, `repository`, `controller`) supports maintainability and evaluation of “good structure.”

---

*End of synopsis draft — expand in Word to 3–4 pages with figure captions and your college header.*
