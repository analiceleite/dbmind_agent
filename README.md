# 🤖 DBMind Agent

An intelligent database assistant that dynamically generates SQL queries and provides answers about company data. Built with Deno, React, and Zypher Agent, featuring real-time streaming, PostgreSQL, and Anthropic Claude AI integration.

## 🏗️ Architecture

Frontend and backend run locally or in containers; the database is automatically initialized via container. AI processing is handled via Anthropic's API.

```
┌─────────────────────────────────────────────────┐
│  React Frontend (Port 3000)                     │
│  - Chat interface for queries                   │
│  - Real-time streaming responses                │
│  - WebSocket client                             │
└────────────────┬────────────────────────────────┘
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────┐
│  Deno Backend (Port 8000)                       │
│  - Intelligent SQL query generation             │
│  - Query validation and execution               │
│  - Zypher Agent + Anthropic Claude integration  │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  PostgreSQL Database (Port 5432)                │
│  - Company data (clients, sales, etc.)          │
│  - Source of truth for AI responses             │
└─────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  Anthropic Claude API                           │
│  - Claude 3.5/Haiku/Sonnet models               │
│  - Real-time AI responses                       │
└─────────────────────────────────────────────────┘
```

---

# Deployment Guide — Zypher Agent

## 🚀 Running the application in containers (recommended)

### Prerequisites
- Docker and Docker Compose installed (Windows, Linux, or Mac).
- Anthropic key (get it from [Anthropic Console](https://console.anthropic.com/))

### Quick Start

1. Download the file `infrastructure/zypher_agent_container.zip`.
2. Extract its contents to a folder of your choice.
3. Adjust the `.env.example` file according to your environment.
4. Rename the `.env.example` file to just `.env`.
5. In the extracted folder, run:
   ```sh
   docker-compose up -d
   ```
6. Access the frontend at: [http://localhost:3000](http://localhost:3000)
7. [See example questions to ask the agent](#recommended-questions)

#### Included Services
- **frontend**: React interface for AI interaction and data visualization.
- **backend**: Deno API connecting to AI, database, and processing queries.
- **postgres**: PostgreSQL database with sample data.

#### Environment Variables
- Backend and database use variables from the `.env` file (example below):
  ```env
  POSTGRES_USER=zypher_user
  POSTGRES_PASSWORD=zypher_secret
  POSTGRES_DB=zypher_db
  POSTGRES_HOST=postgres
  ANTHROPIC_API_KEY=sk-... # your Anthropic key
  ```
- Place the `.env` file in the `backend` folder or adjust `docker-compose.yml` as needed.

> **Note about the database:**
> When running the application with Docker Compose, the Postgres service automatically starts with sample data loaded from the `init.sql` script. You do not need to install or configure Postgres manually — everything happens inside the container. The backend is already configured to connect to this database.

#### Troubleshooting Tips
- If any service fails to start, run:
  ```sh
  docker-compose logs backend
  docker-compose logs frontend
  docker-compose logs postgres
  ```
- Check if the database variables are correct and if the Anthropic key is valid.
- To reset the database, remove the volume:
  ```sh
  docker-compose down -v
  docker-compose up -d
  ```

---

## 👩‍💻 Running locally with Deno and React (development)

### Prerequisites
- Docker installed (optional)
- Deno installed
- Node.js installed
- Anthropic API key (get it from [Anthropic Console](https://console.anthropic.com/))

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/analiceleite/zypher_agent.git
   cd zypher_agent
   ```
2. Backend:
   ```sh
   cd backend
   deno task start
   ```
3. Frontend:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
4. Access the frontend at: [http://localhost:3000](http://localhost:3000)
5. [See example questions to ask the agent](#recommended-questions)

---

## 🔧 Suggested Improvements
- [ ] Add HTTPS with NGINX reverse proxy
- [ ] Integrate BI analytics (charts/dashboards)
- [ ] Enable voice input and transcription
- [ ] User-selectable AI mood/persona
- [ ] Automated CI/CD deployment
- [ ] Multi-language support

---

## Recommended Questions

Use these example questions to explore your company data and test the agent's capabilities:

### 🛒 Product Insights
- What products are available and what are their prices?
- Which product was the best-seller this month?
- How many units of the Notebook Pro were sold?

### 👥 Customer Analytics
- How many customers are currently registered?
- Which customers are from New York?

### 💼 Employee & HR
- How many employees work in the sales department?
- What is the average salary of employees?

### 💰 Finance & Budgets
- What is the company’s total budget for 2025?
- How much do we owe in unpaid debts?

### 📦 Inventory & Suppliers
- Which products have low stock (less than 20 units)?
- Who are our suppliers and which cities are they from?

### 🔍 Advanced & Cross-Table Queries
- Which products were sold by Fernanda Lee?
- List sales with customer name, product, and employee involved.

---

## 📬 Contact & Questions
Open an issue on [GitHub](https://github.com/analiceleite/zypher_agent/issues) or send questions by email.
