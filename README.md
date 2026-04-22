# Expense Tracker

A **web-based personal expense tracker** (BCA project). **Spring Boot** serves a REST API and static **HTML / CSS / JavaScript** UI. Data is stored with **JPA** using **H2** (easy) or **MySQL** (persistent).

---

## Where is the project?

The Maven project (the folder that contains **`pom.xml`**) is:

```text
expense-tracker/expense-tracker/
```

**Run every run / build command from that folder** (after `cd` into it).

> If you see `pom.xml` in your current folder, you are already in the right place — use the commands **without** the `cd` line, or only `cd` to that path on your machine.

---

## All commands — run the project (copy & paste)

### 0) Check Java and Maven (once per machine)

```bash
java -version
```

You should see **17** or higher (e.g. `openjdk version "17.x"` or `21.x`).

```bash
mvn -version
```

If `mvn` is not found, install [Apache Maven](https://maven.apache.org/install.html) and add it to your `PATH`, or use the [Maven Wrapper](#5-maven-wrapper-optional) below.

---

### 1) Go to the project directory

**macOS / Linux (bash or zsh):** from the **repository root** (the folder that contains the inner `expense-tracker` folder):

```bash
cd expense-tracker/expense-tracker
```

**Windows (Command Prompt `cmd.exe`):**

```cmd
cd expense-tracker\expense-tracker
```

**Windows (PowerShell):**

```powershell
cd expense-tracker\expense-tracker
```

---

### 2) Run with H2 in-memory (simplest — no MySQL)

Use this for a **quick start**. Data is cleared when you stop the app.

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Wait until the log shows something like **“Started ExpenseTrackerApplication”**.

**Open the app in a browser:**

- Manually: [http://localhost:8080](http://localhost:8080)

**macOS — open the default browser from the terminal:**

```bash
open http://localhost:8080
```

**Windows (PowerShell):**

```powershell
start http://localhost:8080
```

**Stop the server:** in the same terminal, press **Ctrl+C**.

---

### 3) Run with MySQL (data kept after restart)

**3a — Create the database** (in MySQL client, Workbench, or terminal):

```sql
CREATE DATABASE expense_tracker;
```

**3b — Edit** `src/main/resources/application.properties` and set your MySQL password (and user if not `root`):

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

**3c — From the project folder** (`expense-tracker/expense-tracker`):

```bash
mvn spring-boot:run
```

**3d — Open:** [http://localhost:8080](http://localhost:8080)

**Stop:** **Ctrl+C**

---

### 4) Build a JAR, then run

From the project folder (`expense-tracker/expense-tracker`):

**Build:**

```bash
mvn -DskipTests clean package
```

JAR name (default): `target/expense-tracker-0.0.1-SNAPSHOT.jar`

**Run with H2 (dev profile):**

```bash
java -Dspring.profiles.active=dev -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

**Run with MySQL** (after editing `application.properties` as in step 3):

```bash
java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

**Open:** [http://localhost:8080](http://localhost:8080) — **Stop:** **Ctrl+C**

> If `java` says it cannot find the JAR, run `mvn -DskipTests clean package` again and check the exact JAR name under `target/`.

---

### 5) Maven wrapper (optional)

If `mvn` is not installed but `mvnw` exists in the project folder:

**macOS / Linux:**

```bash
cd expense-tracker/expense-tracker
chmod +x mvnw
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

**Windows (PowerShell):**

```powershell
cd expense-tracker\expense-tracker
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

If you get errors about a **missing** `.mvn/wrapper` directory, install system **Maven** and use `mvn` instead of `./mvnw`.

---

### 6) H2 web console (only when using `dev` profile)

With the app running on port **8080**, open:

[http://localhost:8080/h2-console](http://localhost:8080/h2-console)

| Field | Value |
|--------|--------|
| JDBC URL | `jdbc:h2:mem:expensetracker` |
| User Name | `sa` |
| Password | *(empty)* |

---

## One-liner reference

| Goal | Command (from `expense-tracker/expense-tracker`) |
|------|--------------------------------------------------|
| **Run (H2, no MySQL)** | `mvn spring-boot:run -Dspring-boot.run.profiles=dev` |
| **Run (MySQL)** | Edit `application.properties`, then `mvn spring-boot:run` |
| **Build JAR** | `mvn -DskipTests clean package` |
| **Run JAR (H2)** | `java -Dspring.profiles.active=dev -jar target/expense-tracker-0.0.1-SNAPSHOT.jar` |
| **Run JAR (MySQL)** | `java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar` |

---

## Prerequisites (summary)

| Need | Check |
|------|--------|
| **JDK 17+** | `java -version` |
| **Maven 3.6+** (or `mvnw`) | `mvn -version` |
| **Browser** | Any modern browser |
| **MySQL 8** | Only for non-`dev` profile |

---

## Using the app

1. **Categories** — add at least one category.  
2. **Add expense** — amount, date, category.  
3. **View expenses** / **Budget** as needed.  

The UI uses **user id `1`** for the demo.

---

## API (optional testing)

Base: `http://localhost:8080`

| Method | Path |
|--------|------|
| `GET` | `/api/categories?userId=1` |
| `POST` | `/api/categories` |
| `GET` | `/api/expenses?userId=1` |
| `POST` | `/api/expenses` |
| `GET` | `/api/budget?userId=1` |
| `POST` | `/api/budget` |

Use **Postman** or **curl** for `POST` bodies (JSON: `name`, `userId`, `amount`, `description`, `date`, `categoryId`, `month`, etc.).

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| **`mvn` not found** | Install Maven, or use `./mvnw` / `mvnw.cmd` (see above). |
| **Port 8080 in use** | Stop the other app, or set `server.port=8081` in `application.properties` and open `http://localhost:8081`. |
| **MySQL “Access denied”** | Fix user/password in `application.properties`; ensure `expense_tracker` exists. |
| **Wrong Java version** | Use JDK 17+ for this project. |
| **Blank / error page** | Read the terminal stack trace; confirm URL is `http://localhost:8080`. |

---

## Tech stack

- Java **17**, Spring Boot **3.5.x**, Spring Data JPA, MySQL or H2, Lombok  
- Front end: `src/main/resources/static/` (`index.html`, `style.css`, `app.js`)

---

## License / use

Educational (BCA major project) use — adjust as your institution requires.
