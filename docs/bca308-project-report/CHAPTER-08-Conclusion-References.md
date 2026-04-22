# Chapter 8 — Conclusion, Future Scope, and References

## 8.1 Conclusion

The project **Web-Based Personal Expense Tracking System** was successfully designed and implemented to help users **record personal expenses** under **categories**, **view** them in a structured list, and **define monthly budgets**. The solution uses **Spring Boot** for the back end, **JPA** for object–relational mapping, a **relational database** (MySQL or H2), and a **lightweight web front end** without a separate front-end build step, which simplifies **deployment and demonstration** during the viva.

**Achievements:**

- A working **RESTful** API and **browser UI** for core features.  
- **Documented** database design (ERD) and data flow (DFD).  
- **Tested** functionality with a structured test list.  

**Unique features (for viva):**

- **Single application** process serving both static UI and APIs.  
- **User-scoped** API design (e.g. `userId` query parameter) for future **multi-user** support.  
- **Optional H2 profile** for running the project when MySQL is not configured.  

**Innovation** (at BCA level): practical problem, clear architecture, and extensible design rather than a closed script-only program.

---

## 8.2 Future Scope

1. **User registration and session-based login** with password hashing and protected routes.  
2. **Dashboard** with **charts** (category-wise pie chart, monthly bar chart) using a library (e.g. Chart.js).  
3. **Compare budget vs. actual** spending for a selected month with automatic alerts.  
4. **Export** to **PDF/Excel** and email reminders.  
5. **Mobile-responsive** improvements and **PWA** (Progressive Web App) support.  
6. **Unit and integration tests** (JUnit, MockMvc) for full regression coverage.  
7. **Docker** + **CI/CD** for one-command deployment.  

---

## 8.3 References

> Use **consistent citation style** (APA / IEEE) as per your department. Examples below in **book / web** form—replace with official URLs and exact editions you used.

1. Spring Team. *Spring Framework Documentation* — [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot) (accessed 2026).  
2. Oracle. *The Java™ Tutorials* — [https://docs.oracle.com/javase/tutorial/](https://docs.oracle.com/javase/tutorial/) (accessed 2026).  
3. Oracle. *MySQL 8.0 Reference Manual* — [https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/) (accessed 2026).  
4. MDN Web Docs. *JavaScript* — [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (accessed 2026).  
5. Pressman, R. S. & Maxim, B. R. *Software Engineering: A Practitioner’s Approach* (9th ed.). McGraw-Hill. (Or latest edition as per library.)  
6. Sommerville, I. *Software Engineering* (10th/11th ed.). Pearson.  
7. Your **lab manual / BCA 308** handout (internal document), [Year].  

*Add 2–3 more references if your guide requires a minimum count (e.g. Hibernate documentation, W3C HTML5).*

---

## 8.4 Student Declaration (if required on last page)

I hereby declare that this project report is my own original work. The work of others has been **acknowledged** in the text and listed in **References**. I have not submitted this work for any other degree.

**Signature:** _______________  
**Name:** _______________  
**Date:** _______________
