# Chapter 2 — Theoretical Background, Problem Definition, and User Requirements

## 2.1 Problem Definition

**Personal expense management** is the practice of recording, classifying, and reviewing spending to improve financial awareness. Without tools, people rely on memory or ad hoc notes, which is **error-prone** and does not support **aggregates** (totals, category-wise breakdown) easily.

**Formal problem statement:** *Users need a simple web-based system to register expenses under self-defined categories, view historical transactions, and record monthly budget targets, so that they can monitor spending behavior over time.*

---

## 2.2 Theoretical Background

### 2.2.1 Web application architecture (three-tier)

1. **Presentation layer:** HTML/CSS/JavaScript in the browser; issues HTTP requests.  
2. **Application layer:** Spring Boot **controllers** map REST endpoints; **JPA** maps objects to tables.  
3. **Data layer:** MySQL (or H2) stores entities **persistently**.

### 2.2.2 Relational data model

Entities (conceptually) include **User**, **Category**, **Expense**, and **Budget**. **Expense** links to **User** and **Category** through foreign key fields (e.g. `userId`, `categoryId`). This follows **normalization** principles: categories are not repeated in each row as free text.

### 2.2.3 RESTful services

- **GET** to retrieve resources (e.g. list of expenses).  
- **POST** to create resources (e.g. new expense).  
Resources are identified by **URLs** such as `/api/expenses` and may use **query parameters** (e.g. `userId=1`).

### 2.2.4 Software process (simplified)

The project can be described using a **waterfall** or **incremental** life cycle: **requirements → design → implementation → testing → documentation**. Agile iterations are also acceptable as a narrative in “methodology” if you discussed weekly milestones with your guide.

---

## 2.3 User Requirements (System Analysis)

### 2.3.1 Actors

- **Primary user:** A person who wants to track personal spending (in the demo, one logical user is used).

### 2.3.2 Functional requirements (summary)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | User shall add a **category** with a name. | High |
| FR-2 | User shall **add an expense** with amount, date, description, and category. | High |
| FR-3 | User shall **view a list** of expenses (newest first, if implemented in query). | High |
| FR-4 | User shall **set a monthly budget** (month + amount). | Medium |
| FR-5 | System shall **store** all data in a database and **survive** application restarts. | High |

### 2.3.3 Non-functional requirements (summary)

| ID | Requirement |
|----|-------------|
| NFR-1 | Web UI should load in a **desktop browser** without installing a separate client. |
| NFR-2 | Response time for local deployment should be **acceptable** for viva (under a few seconds per action). |
| NFR-3 | Code should be **documented in the report** with ERD, DFD, and test cases. |

---

*Add a short “Feasibility” paragraph (technical / operational) if your department expects it: Java + Spring Boot and MySQL are well documented; project is feasible in one semester with one developer.*
