# TaskSphere 🌌

A modern full-stack Task Management Application built using **Spring Boot**, **PostgreSQL**, **React (Vite)**, and **Tailwind CSS**. TaskSphere helps users organize and manage their daily tasks through an intuitive Kanban-style interface with secure authentication and real-time task management.

---

## 🚀 Features

### Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Password Encryption using BCrypt
* Protected Routes
* Session Management

### Task Management

* Create New Tasks
* Update Existing Tasks
* Delete Tasks
* Search Tasks
* Manage Task Status

### Kanban Board

* To Do Column
* In Progress Column
* Completed Column
* Quick Task Status Transition

### User Experience

* Responsive Design
* Modern Glassmorphism UI
* Toast Notifications
* Loading States
* Error Handling

---

## 🛠️ Technology Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* Lucide React

---

## 📁 Project Structure

```text
TaskSphere/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

* Java 17 or Higher
* Maven
* PostgreSQL
* Node.js (18 or Higher)
* npm

---

## 🗄️ Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE tasksphere;
```

Update your database configuration inside:

```text
backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tasksphere
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## ▶️ Running the Backend

Navigate to the backend folder:

```bash
cd backend
```

Run the application:

### Windows

```bash
mvnw spring-boot:run
```

### Linux/Mac

```bash
./mvnw spring-boot:run
```

Backend will start on:

```text
http://localhost:8084
```

---

## ▶️ Running the Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

---


## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### Tasks

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | /api/tasks      | Get All Tasks  |
| GET    | /api/tasks/{id} | Get Task By ID |
| POST   | /api/tasks      | Create Task    |
| PUT    | /api/tasks/{id} | Update Task    |
| DELETE | /api/tasks/{id} | Delete Task    |

---

## 🧪 Build for Production

Build frontend:

```bash
cd frontend
npm run build
```

Generated files will be available in:

```text
dist/
```

---

## 📸 Application Modules

* Login Page
* Registration Page
* Dashboard
* Task Creation
* Task Search
* Kanban Board
* Task Status Management

---

## 🔒 Security Features

* JWT Token Authentication
* BCrypt Password Encryption
* Protected API Endpoints
* CORS Configuration
* Stateless Session Management

---



