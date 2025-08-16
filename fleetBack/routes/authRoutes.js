const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken")
require('dotenv').config();

router.post('/signup', async (req, res) => {
    const { role, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Execute Stored Procedure
        const [results] = await db.execute('CALL InsertUser(?, ?, ?)', [role, email, passwordHash]);

        res.status(201).json({ message: 'User added successfully', results });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
});
  

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Call stored procedure to get user details
        const [rows] = await db.execute("CALL AuthenticateUser(?)", [email]);

        if (rows.length === 0 || !rows[0].length) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = rows[0][0]; // Extract user data
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user.id, role: user.role, email: user.email } 
        });

    } 
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Failed to authenticate user', details: error.message });
    }
});

module.exports = router;