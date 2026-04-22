# Appendix B — Resources, Data Sources, and Limitations

## B.1 Resources Required

### B.1.1 Hardware

- **Development PC** with at least **4 GB RAM** (8 GB recommended).  
- **Storage** for JDK, IDE, Maven local repository, MySQL data, and project files.  
- **Network** (optional) for browser documentation and API testing.  
- For **viva:** laptop to run the application live or a **pre-recorded video** if your college allows.

### B.1.2 Software (summary)

- **Operating system:** Windows / macOS / Linux.  
- **JDK, Maven, Spring Boot, MySQL (or H2), browser, IDE** — as listed in Chapter 5.  

### B.1.3 Data sources

- **User-entered data only:** categories, expenses, and budgets are **typed by the user** at runtime.  
- **No** external public dataset is required.  
- **No** cloud API keys (unless you extend the project with currency APIs, etc.).  
- If you **seed** demo data: describe it as **synthetic** test data created for demonstration.

### B.1.4 Human resources

- **Project guide** for review at each stage.  
- **Peers / lab** for informal testing.  

---

## B.2 System Limitations

1. **Security:** Not designed for public internet deployment; **no** full OWASP hardening, **HTTPS** configuration, or **penetration testing** in baseline project.  
2. **Scalability:** Tested for **small** datasets on a **single** machine; no clustering.  
3. **Concurrency:** Typical **single user** or **low concurrency**; no formal load testing.  
4. **Data validation:** Business rules are **basic**; advanced rule engines are out of scope.  
5. **Reporting:** **No** built-in PDF bank statements or **GST**; academic demo only.  
6. **Backup and recovery:** User is responsible for **exporting/ backing up** MySQL if needed; app does not include automated backup.  

---

## B.3 Assumptions

- User uses a **modern browser** (Chrome, Edge, Firefox).  
- For MySQL, **database and credentials** in `application.properties` are **correct** before run.  
- System clock and **date** inputs are **reasonable** (no special timezone UI).  

---

*This appendix satisfies the “**Resources and Limitations**” section in many BCA report outlines.*
