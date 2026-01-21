// Backend API for Opendeck Authentication
// PostgreSQL implementation with bcrypt password hashing

// Suppress specific deprecation warning for _headers (temporary fix until dependencies are updated)
// This warning comes from Express's 'send' package using deprecated res._headers
// The proper fix is to update Express: npm update express
process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning' && 
        (warning.message.includes('_headers') || warning.code === 'DEP0066')) {
        // Suppress only the _headers deprecation warning (DEP0066)
        return;
    }
    // Show all other warnings
    console.warn(warning.name, warning.message);
});

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'opendeck',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

// Test database connection
pool.connect()
    .then(() => console.log('PostgreSQL Connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Create users table if it doesn't exist
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                company VARCHAR(255),
                email_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Initialize database on startup
initializeDatabase();

// JWT Secret (Use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, company } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'First name, last name, email, and password are required' 
            });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert new user
        const result = await pool.query(
            `INSERT INTO users (email, password_hash, first_name, last_name, company, email_verified, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING id, email, first_name, last_name, company, email_verified, created_at`,
            [email.toLowerCase(), passwordHash, firstName, lastName, company || null, false]
        );

        const user = result.rows[0];

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                company: user.company,
                emailVerified: user.email_verified
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Sign In Endpoint
app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        // Find user by email
        const result = await pool.query(
            'SELECT id, email, password_hash, first_name, last_name, company, email_verified FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const user = result.rows[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Update last login time
        await pool.query(
            'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Sign in successful',
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                company: user.company,
                emailVerified: user.email_verified
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Protected Route Example - Get User Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, email, first_name, last_name, company, email_verified, created_at, updated_at FROM users WHERE id = $1',
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        const user = result.rows[0];
        res.json({ 
            success: true, 
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                company: user.company,
                emailVerified: user.email_verified,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required' 
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        req.user = user;
        next();
    });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// For PostgreSQL/MySQL, you would use:
// const { Pool } = require('pg'); // For PostgreSQL
// const mysql = require('mysql2/promise'); // For MySQL
// 
// Example PostgreSQL connection:
// const pool = new Pool({
//     host: 'localhost',
//     user: 'your_user',
//     password: 'your_password',
//     database: 'opendeck',
//     port: 5432
// });

