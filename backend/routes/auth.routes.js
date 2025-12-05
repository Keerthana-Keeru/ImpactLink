// backend/routes/auth.routes.js

const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. IMPORT THE MIDDLEWARE YOU JUST FIXED ---
const verifyToken = require('../middleware/auth.middleware.js');

JWT_SECRET=process.env.JWT_SECRET;
// --- YOUR EXISTING /register ROUTE ---
router.post('/register', async (req, res) => {
    // (Your existing register code is fine)
    // (Pasting it here for completeness)
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'volunteer'
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully!',
            user: { id: savedUser._id, username: savedUser.username, email: savedUser.email, role: savedUser.role }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: err.message });
    }
});

// --- YOUR EXISTING /login ROUTE ---
router.post('/login', async (req, res) => {
    // (Your existing login code is fine)
    // (Pasting it here for completeness)
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password.' });
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const payload = {
            user: { id: user._id, role: user.role }
        };
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: 'Logged in successfully!',
                    token: token,
                    user: { id: user._id, username: user.username, email: user.email, role: user.role }
                });
            }
        );
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: err.message });
    }
});


// --- 2. ADD THIS NEW PROTECTED ROUTE ---
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.json({ 
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error: Failed to fetch profile.' });
    }
});
// --- END OF NEW ROUTE ---

// backend/routes/auth.routes.js

// ... (existing code) ...

/*
 * POST /api/auth/reset-password
 * Purpose: Reset password using email
 */
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Please provide email and new password.' });
    }

    try {
        // 1. Find the user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist.' });
        }

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 3. Update the user
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully! Please log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;