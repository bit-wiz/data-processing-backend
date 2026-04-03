# Finance Data Processing & Access Control System


## Features

- **JWT Authentication**: Secure, stateless user sessions with login/logout.
- **RBAC (Role-Based Access Control)**: Three distinct roles (`Admin`, `Analyst`, `Viewer`) with granular permissions.
- **Financial Record Management**: Full CRUD operations with advanced filtering.
- **Automated Dashboard**: Aggregated summaries, category-wise breakdowns, and monthly trends.
- **Turso Integration**: Scalable LibSQL (SQLite-compatible) database for cloud-native persistence.
- **Interactive Documentation**: Full API spec via Swagger UI.
- **Validation & Security**: Strict input validation and password hashing with bcrypt.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Turso (LibSQL)
- **ORM**: Prisma
- **Auth**: JSON Web Tokens (JWT) & bcryptjs
- **Docs**: Swagger / OpenAPI

## Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- A Turso account and database (or a local SQLite file)

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_URL="file:./dev.db"  # for prisma cli
TURSO_DATABASE_URL="libsql://.turso.io" # get in torso.io
TURSO_AUTH_TOKEN="token"
JWT_SECRET="super-secret-key"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
Since this project uses a Driver Adapter for Turso, standard Prisma migrations for remote DBs are handled via `db push` or manual scripts.
```bash
# Generate Prisma Client
npx prisma generate

# Seed the database
node prisma/seed.js
```

### 5. Running the App
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## Docker Deployment

### 1. Build the Image
```bash
docker build -t finance-backend .
```

### 2. Run the Container
Ensure you pass the required environment variables:
```bash
docker run -p 3000:3000 \
  -e TURSO_DATABASE_URL="libsql://.turso.io" \
  -e TURSO_AUTH_TOKEN="token" \
  -e JWT_SECRET="super-secret-key" \
  finance-backend
```

## API Explanation

### Authentication
- **POST /api/auth/login**: Exchange email/password for a JWT.
- **POST /api/auth/logout**: Placeholder for client-side token disposal.

### Users (Admin Only)
- **GET /api/users**: List all users.
- **POST /api/users**: Create a new user.
- **PATCH /api/users/:id**: Update user role/status.

### Financial Records
- **GET /api/records**: List records with filters (`type`, `category`, `date`, `startDate`, `endDate`).
- **POST /api/records**: Create record (Admin only).
- **PUT /api/records/:id**: Update record (Admin only).
- **DELETE /api/records/:id**: Delete record (Admin only).

### Dashboard
- **GET /api/dashboard/summary**: Overview of income/expenses.
- **GET /api/dashboard/category-wise**: Expense breakdown by category.
- **GET /api/dashboard/monthly-trends**: Chronological trends.
- **GET /api/dashboard/recent**: Latest 5 transactions.

## Assumptions & Tradeoffs

### Assumptions
1. **Mock Admin Logic**: User roles are managed manually by admins via the `/users` endpoint ( status [inactive, active] ).
2. **Simplified Logout**: As JWTs are stateless, "logout" is assumed to be handled by the client removing the token. No server-side blacklisting is implemented for this version.
3. **Currency**: All amounts are treated as `Float` for simplicity; for high-precision financial apps, (cents) would be preferred.

### Tradeoffs
1. **SQLite/Turso vs PostgreSQL**: Chose Turso for its extremely low latency and "SQLite-at-the-edge" benefits, which fits the lightweight nature of this project.
2. **Driver Adapters**: Used Prisma's driver adapter for Turso. This requires `db push` or manual SQL instead of standard Prisma Migrations for remote synchronization, but ensures 100% compatibility with LibSQL features.
3. **Express-Validator vs Joi/Zod**: Chose `express-validator` to keep validation logic close to the route definitions for better readability in a mid-sized project.

## 🧪 Documentation
Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) once the server is running to explore the interactive API documentation and try out requests!
