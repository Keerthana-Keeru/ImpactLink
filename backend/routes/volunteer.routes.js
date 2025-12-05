// backend/routes/volunteer.routes.js

const router = require('express').Router();
const Volunteer = require('../models/volunteer.model');
const verifyToken = require('../middleware/auth.middleware');

// POST /api/volunteer/profile - Create or Update Profile
router.post('/profile', verifyToken, async (req, res) => {
    const { firstName, lastName, phoneNumber, address, skills, interests, availability } = req.body;

    const profileFields = {
        user: req.user.id,
        firstName,
        lastName,
        phoneNumber,
        address,
        skills: skills ? skills.split(',').map(s => s.trim()) : [], // Convert "a,b,c" string to array
        interests,
        availability
    };

    try {
        let volunteer = await Volunteer.findOne({ user: req.user.id });

        if (volunteer) {
            // Update existing
            volunteer = await Volunteer.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(volunteer);
        }

        // Create new
        volunteer = new Volunteer(profileFields);
        await volunteer.save();
        res.json(volunteer);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/volunteer/profile - Get Current Profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
        if (!volunteer) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(volunteer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;