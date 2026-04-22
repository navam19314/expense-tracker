# Chapter 5 — Methodology & Implementation; Hardware & Software; Maintenance

## 5.1 Architecture Overview

The system follows a **client–server** pattern:

- **Client:** Web browser; HTML/CSS/JS; uses **`fetch()`** to call JSON REST APIs.  
- **Server:** **Spring Boot** embeds **Tomcat**; **controllers** expose `/api/...` endpoints.  
- **Persistence:** **Spring Data JPA** and **Hibernate** map **entities** to **tables**.  
- **Database:** **MySQL** (typical) or **H2** (embedded) depending on `spring.profiles.active`.

*Insert a simple **deployment diagram** in Word (browser → port 8080 → Spring → JDBC → DB).*

---

## 5.2 Implementation Details (Key Modules)

| Module | Description |
|--------|-------------|
| `ExpenseTrackerApplication` | Main entry; `@SpringBootApplication` bootstraps the context. |
| `model` | JPA entities: e.g. `Expense`, `Category`, `Budget`, `User` (as implemented). |
| `repository` | `JpaRepository` interfaces: CRUD and custom `findByUserId...` where added. |
| `controller` | `RestController` classes mapping `/api/expenses`, `/api/categories`, `/api/budget`, `AuthController` for future login. |
| `static` | `index.html`, `style.css`, `app.js` for SPA-style navigation. |

**REST examples (illustrative):**

- `POST /api/categories` — body: `{ "name", "userId" }`  
- `GET /api/categories?userId=1`  
- `POST /api/expenses` — body: `{ "amount", "description", "date", "userId", "categoryId" }`  
- `GET /api/expenses?userId=1`  
- `POST /api/budget` — body: `{ "month", "amount", "userId" }`  
- `GET /api/budget?userId=1`  

*Replace with your exact request/response samples in an appendix; keep passwords out of the report.*

---

## 5.3 Hardware and Software (Detailed)

### 5.3.1 Hardware

- **Client:** Any PC with a modern browser.  
- **Server (development):** Student laptop with **4 GB+ RAM** (8 GB recommended for IDE + MySQL + browser).  
- **Data storage:** MySQL on **localhost** or a lab server; disk space ~ **500 MB+** for DB + Java + IDE.

### 5.3.2 Software (full list for report)

| Type | Software |
|------|----------|
| OS | Windows 10/11, macOS, or Linux |
| JDK | Java 17+ |
| Build | Apache Maven 3.8+ |
| Framework | Spring Boot 3.5.x |
| DBMS | MySQL 8 / H2 2.x (runtime) |
| IDE | IntelliJ IDEA, Eclipse, VS Code |
| API test | Postman, curl (optional) |

---

## 5.4 System Maintenance & Evaluation (Section for Guidelines)

- **Configuration:** `application.properties` and profile-specific files (e.g. `application-dev.properties` for H2) hold datasource URLs and JPA options.  
- **Updates:** Rebuild with `mvn package` after code changes; `ddl-auto=update` in dev may auto-adjust schema; **use caution in production** (migrations are preferred for real deployment).  
- **Backup:** Back up the **MySQL** database (dump) for any important demo data before OS reinstall.  
- **Evaluation:** Measured by **functionality** (all CRUD paths work), **stability** (no crashes in demo), and **usability** (examiners can follow the flow).

---

*This chapter pairs with **Testing** (next file) and **Code/Screens** (`CHAPTER-07`).*
