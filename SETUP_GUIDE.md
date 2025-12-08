# Opendeck Signup/Signin Setup Guide

This guide will help you set up the authentication system for your Opendeck landing page with PostgreSQL.

## What's Been Added

### Frontend (index.html)
- ✅ Signup/Signin section with toggle functionality
- ✅ Form validation (password matching, minimum length)
- ✅ API integration ready for your backend
- ✅ Success/error message display
- ✅ Token storage in localStorage
- ✅ Auto-redirect for logged-in users
- ✅ Collects: First Name, Last Name, Email, Company (optional), Password

### Backend (backend-example.js)
- ✅ User registration endpoint
- ✅ User login endpoint
- ✅ JWT token generation
- ✅ Password hashing with bcrypt
- ✅ Protected route example
- ✅ PostgreSQL integration with your schema
- ✅ Database table auto-creation

## Setup Instructions

### Step 1: Update the API URL

Open `index.html` and update line 539 with your backend URL:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api'; // Replace with your actual backend URL
```

For local development, use:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- dotenv (environment variables)

### Step 3: Configure Your PostgreSQL Database

#### Database Schema

Your database uses the following schema (already configured in the backend):

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Install PostgreSQL

1. **macOS**: `brew install postgresql@15`
2. **Ubuntu/Debian**: `sudo apt install postgresql postgresql-contrib`
3. **Windows**: Download from https://www.postgresql.org/download/windows/

#### Create Database

```bash
# Start PostgreSQL service
# macOS:
brew services start postgresql@15

# Linux:
sudo systemctl start postgresql

# Access PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE opendeck;
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE opendeck TO your_user;
\q
```

**Note**: The backend will automatically create the `users` table on first run if it doesn't exist.

### Step 4: Set Environment Variables

Create a `.env` file in your project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=opendeck
DB_USER=your_user
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000
```

**IMPORTANT**: 
- Replace `DB_USER` and `DB_PASSWORD` with your PostgreSQL credentials
- Change `JWT_SECRET` to a strong, random string in production!
- Never commit the `.env` file to version control

### Step 5: Start the Backend Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Step 6: Test the Integration

1. Open `index.html` in your browser
2. Click on "Sign Up" in the navigation
3. Fill out the signup form
4. You should see a success message and be redirected

## API Endpoints

### POST /api/auth/signup
Register a new user

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Acme Inc.",
    "password": "password123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "User created successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "company": "Acme Inc.",
        "emailVerified": false
    }
}
```

### POST /api/auth/signin
Sign in an existing user

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "Sign in successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "company": "Acme Inc.",
        "emailVerified": false
    }
}
```

### GET /api/user/profile
Get user profile (protected route)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
    "success": true,
    "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "company": "Acme Inc.",
        "emailVerified": false,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```

## Security Best Practices

1. **Use HTTPS in production** - Never send passwords over HTTP
2. **Change JWT_SECRET** - Use a strong, random secret key
3. **Use environment variables** - Never commit secrets to git
4. **Validate input** - Always validate and sanitize user input
5. **Rate limiting** - Implement rate limiting to prevent brute force attacks
6. **Password requirements** - Enforce strong password policies
7. **Email verification** - Consider adding email verification for signups

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure the backend has CORS enabled (already included in the example).

### Database Connection Issues
- Check if your database is running
- Verify connection credentials
- Ensure the database exists

### Token Not Working
- Check if JWT_SECRET matches between token generation and verification
- Verify token expiration time
- Check if token is being sent in the Authorization header

## Next Steps

1. Add email verification
2. Implement password reset functionality
3. Add "Forgot Password" feature
4. Create a user dashboard page
5. Add role-based access control
6. Implement session management
7. Add two-factor authentication (2FA)

## Support

For questions or issues, contact: info@opendeck.co.uk

