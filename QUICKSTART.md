# Opendeck Authentication - Quick Start Guide

Get your authentication system up and running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create PostgreSQL Database

```bash
# Start PostgreSQL
brew services start postgresql@15  # macOS
# or
sudo systemctl start postgresql    # Linux

# Create database
psql postgres
CREATE DATABASE opendeck;
\q
```

### 3. Create `.env` File

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=opendeck
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-secret-key-here
PORT=3000
```

### 4. Update API URL in Frontend

Open `index.html` and update line 539:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### 5. Start the Backend

```bash
npm start
```

You should see:
```
PostgreSQL Connected
Database initialized successfully
Server running on port 3000
```

### 6. Test the Application

1. Open `index.html` in your browser
2. Click "Sign Up" in the navigation
3. Fill out the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Company: Acme Inc.
   - Password: password123
   - Confirm Password: password123
4. Submit the form
5. You should see a success message!

## Database Schema

Your PostgreSQL database uses this schema:

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| email | VARCHAR(255) | Unique email address |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| company | VARCHAR(255) | Company name (optional) |
| email_verified | BOOLEAN | Email verification status |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

## API Endpoints

### Sign Up
```
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Inc.",
  "password": "password123"
}
```

### Sign In
```
POST http://localhost:3000/api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```
GET http://localhost:3000/api/user/profile
Authorization: Bearer <your-token>
```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `brew services list` (macOS)
- Verify credentials in `.env` file
- Test connection: `psql -U your_user -d opendeck`

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process: `lsof -ti:3000 | xargs kill`

### CORS Errors
- Make sure backend is running on port 3000
- Check API_BASE_URL in index.html matches backend URL

## Next Steps

- ✅ Authentication is working!
- Add email verification
- Implement password reset
- Create user dashboard
- Add role-based access control

## Support

For detailed documentation, see `SETUP_GUIDE.md`

Questions? Contact: info@opendeck.co.uk

