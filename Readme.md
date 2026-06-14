# Enterprise CRM System

A robust, full-stack Customer Relationship Management (CRM) platform designed for tracking leads, managing sales pipelines, and analyzing business performance. Built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS, this system features a dynamic Kanban board and Role-Based Access Control (RBAC).

## 🚀 Features

* **Role-Based Access Control (RBAC):** Distinct interfaces and access scopes for Admins, Sales Managers, and Sales Representatives.
* **Interactive Sales Pipeline:** A visual Kanban board featuring stage-by-stage progression logic for deals.
* **Dynamic Analytics Dashboard:** Real-time metrics tracking total pipeline values and active deal distributions (restricted to Managers/Admins).
* **Activity Logs & Creation Panel:** In-app creation tools to spin up new target leads on the fly.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router v6, Tailwind CSS, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & BcryptJS password hashing

---

## 📂 Project Structure

```text
├── server/                  # Backend Node.js Environment
│   ├── config/              # Database configurations
│   ├── middleware/          # JWT Auth & Permission guards
│   ├── models/              # Mongoose Data Schemas (User, Lead)
│   ├── routes/              # REST API endpoints (Auth, Leads)
│   └── server.js            # Entry application point
│
└── client/                  # Frontend Vite + React Environment
    ├── src/
    │   ├── components/      # Global Layouts (Navbar)
    │   ├── pages/           # Platform Views (Login, Register, Pipeline, Dashboard)
    │   ├── App.jsx          # Route Guards & Global Core Context
    │   └── index.css        # Tailwind Core Directives
    ├── tailwind.config.js   # Tailwind Configuration File
    └── vite.config.js       # Vite Server Asset & Proxy Engine
