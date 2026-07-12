# 🚀 Booking Platform API

A RESTful backend API for a Booking Platform built with **NestJS**, **PostgreSQL**, and **Prisma ORM**.

The system allows customers to create bookings without authentication, while authenticated users can securely manage services and bookings using JWT Authentication.

---

## 📖 Table of Contents

- Features
- Tech Stack
- Architecture
- Project Structure
- Installation
- Environment Variables
- Running the Application
- Running with Docker
- API Documentation
- Authentication
- Business Rules
- Testing
- Future Improvements
- License

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## Service Management

- Create Service
- View All Services
- View Service by ID
- Update Service
- Delete Service

## Booking Management

- Create Booking
- View All Bookings
- View Booking by ID
- Update Booking Status

## Validation

- DTO Validation
- Global Validation Pipe
- Route Parameter Validation

## Business Rules

- Booking must belong to an existing service
- Booking date cannot be in the past
- Cancelled bookings cannot be marked as completed
- Only authenticated users can manage services
- Customers can create bookings without authentication

## Additional Features

- Pagination
- Search Bookings
- Filter Bookings by Status
- Swagger Documentation
- Global Exception Handling
- Docker Support
- Unit Testing

---

# 🛠 Tech Stack

### Backend

- NestJS
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- Passport.js

### Validation

- class-validator
- class-transformer

### Documentation

- Swagger

### Testing

- Jest

### DevOps

- Docker
- Docker Compose

---

# 🏗 Architecture

```
Client
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

---

# 📁 Project Structure

```
src/
│
├── auth/
├── bookings/
├── services/
├── users/
├── prisma/
├── common/
│   └── filters/
│
├── app.module.ts
└── main.ts
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/booking-platform-api.git

cd booking-platform-api
```

---

## Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/booking_platform_db?schema=public"

JWT_SECRET=your-super-secret-key

JWT_EXPIRES_IN=1d

PORT=3000
```

---

# 🗄 Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

---

# ▶ Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build

npm run start:prod
```

---

# 🐳 Running with Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Stop

```bash
docker compose down
```

---

# 📚 API Documentation

Swagger UI

```
http://localhost:3000/api
```

---

# 🔐 Authentication

Login returns a JWT Access Token.

Use the token in Swagger.

```
Bearer YOUR_ACCESS_TOKEN
```

Protected Endpoints

- Services
- Bookings Management

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |

---

## Services

| Method | Endpoint |
|---------|----------|
| GET | /services |
| GET | /services/:id |
| POST | /services |
| PATCH | /services/:id |
| DELETE | /services/:id |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| POST | /bookings |
| GET | /bookings |
| GET | /bookings/:id |
| PATCH | /bookings/:id/status |

---

# 📄 Pagination

```
GET /bookings?page=1&limit=10
```

---

# 🔍 Search

```
GET /bookings?search=john
```

Searches by:

- Customer Name
- Customer Email
- Customer Phone

---

# 🎯 Filter

```
GET /bookings?status=PENDING
```

Supported values

- PENDING
- CONFIRMED
- COMPLETED
- CANCELLED

---

# ✅ Business Rules

- A booking must belong to an existing service.
- Booking dates cannot be in the past.
- Cancelled bookings cannot be marked as completed.
- Only authenticated users can manage services.
- Customers can create bookings without authentication.

---

# ⚠ Global Exception Handling

The application provides a custom global exception filter for consistent error responses.

Example

```json
{
  "statusCode": 404,
  "timestamp": "2026-07-12T12:00:00.000Z",
  "path": "/bookings/999",
  "message": "Booking with ID 999 not found"
}
```

---

# ✔ Validation

Implemented using

- class-validator
- class-transformer
- Global Validation Pipe

---

# 🧪 Unit Testing

Run all tests

```bash
npm test
```

Run a specific test

```bash
npm test bookings.service.spec.ts
```

Current tests include

- Booking creation
- Service existence validation
- Booking date validation
- Booking status updates
- Business rule validation

---
# 📚 API Documentation

This project uses **Swagger (OpenAPI)** for interactive API documentation.

After starting the application, open the following URL in your browser:

```
http://localhost:3000/api
```

Swagger provides:

- Interactive API testing
- Request and response schemas
- DTO validation details
- JWT Bearer Authentication support
- Endpoint descriptions
- HTTP status codes

## Using Protected Endpoints

Some endpoints require authentication.

### Step 1

Register a new user:

```
POST /auth/register
```

### Step 2

Login to receive a JWT Access Token:

```
POST /auth/login
```

Example response:

```json
{
  "accessToken": "your-jwt-access-token"
}
```

### Step 3

Click the **Authorize** button at the top-right of the Swagger page.

Enter the token in the following format:

```
Bearer your-jwt-access-token
```

Click **Authorize**, then **Close**.

You can now access all protected endpoints directly from Swagger.

---

### Swagger Features

- Interactive API Explorer
- JWT Authentication
- Request Body Examples
- Response Models
- Validation Rules
- Try-It-Out Functionality

---

# 🚀 Future Improvements

- Refresh Token Authentication
- Role-Based Authorization
- Email Notifications
- Booking Cancellation API
- Booking Update API
- Rate Limiting
- Logging
- CI/CD Pipeline
- Integration Tests
- E2E Tests

---

# 👨‍💻 Author

**Paran Kabiththanan**


LinkedIn

```
https://www.linkedin.com/in/paran-kabiththanan
```

---

# 📜 License

This project is developed for educational and portfolio purposes.
