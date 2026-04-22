# Chapter 4 — System Planning (PERT) and Methodology

## 4.1 PERT / Project Schedule (Gantt-Style)

> PERT = Program Evaluation and Review Technique. Many colleges accept a **Gantt chart** or a **milestone table**; use your guide’s preferred format. Below is a **milestone** table you can turn into a chart in **Excel** or **draw.io**.

| Phase | Tasks | Week (example) | Duration |
|-------|--------|-----------------|----------|
| 1. Proposal & synopsis | Finalize title, write synopsis, get approval | 1–2 | 2 wks |
| 2. Analysis | Requirements, actor list, initial ERD | 3 | 1 wk |
| 3. Design | DFD, final ERD, screen mockups | 4 | 1 wk |
| 4. Environment setup | JDK, Maven, MySQL, Spring Boot run | 4–5 | 1 wk |
| 5. Implementation (core) | Entities, repositories, REST, basic UI | 5–7 | 3 wks |
| 6. Implementation (UI) | Styling, navigation, validation | 7–8 | 1 wk |
| 7. Testing & fixes | Manual tests, API checks, bug fixes | 8–9 | 1 wk |
| 8. Documentation | Report, diagrams, code listing, viva Q&A | 9–10 | 2 wks |
| 9. Print & bind | Review guide comments, final print | 10 | 0.5 wk |

**Critical path (typical):** Design → DB + entities → Controllers + UI → Testing → Report.

> **Word deliverable:** Insert a **Gantt** or **PERT network** figure here (Fig 4.1). Tools: Microsoft Project (optional), Excel, draw.io, Canva, or WPS Gantt.

---

## 4.2 Methodology

### 4.2.1 Software development life cycle (SDLC)

The project is documented using a **phased** approach:

1. **Planning** — Objectives, scope, synopsis.  
2. **Analysis** — User requirements, use cases (implicit in tables).  
3. **Design** — ERD, DFD, navigation structure.  
4. **Implementation** — Spring Boot, JPA, static web assets.  
5. **Testing** — Functional and integration tests at a basic level.  
6. **Deployment (demo)** — JAR or IDE run on laptop with local database.

### 4.2.2 Implementation methodology

- **Bottom-up / incremental:** Build **database + entities** first, then **repositories**, then **REST APIs**, then **client** pages calling APIs with `fetch`.  
- **Configuration profiles:** e.g. **H2 in-memory** for development without MySQL, and **MySQL** for a stable deployment—document both in “Hardware & Software”.

### 4.2.3 Coding and documentation standards

- Java package by layer: `model`, `repository`, `controller`.  
- Consistent **REST** naming under `/api/...`.  
- **Git** (optional) for version history; mention in methodology if you used it.

---

## 4.3 Risk and Mitigation (brief)

| Risk | Mitigation |
|------|------------|
| Database not connecting | Use H2 profile; verify `application.properties` |
| Time overrun for UI | Prioritize working flows over cosmetic features first |
| Report page count | Start writing report alongside coding |

---

*In Word, add a short paragraph introducing Figure 4.1 and reference it in the text: “The project schedule (Fig. 4.1) shows…”. *
