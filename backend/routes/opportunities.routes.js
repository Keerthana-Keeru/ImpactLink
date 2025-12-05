// backend/routes/opportunities.routes.js

const router = require('express').Router();
const Opportunity = require('../models/opportunity.model');
const verifyToken = require('../middleware/auth.middleware');

/*
 * POST /api/opportunities
 * Purpose: Create a new volunteering event
 * Access: Protected (Logged in users only)
 */
router.post('/', verifyToken, async (req, res) => {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Create the new opportunity
        const newOpportunity = new Opportunity({
            created_by: req.user.id, // Link it to the logged-in NGO
            title,
            description,
            date,
            location
        });

        const savedOpportunity = await newOpportunity.save();
        res.json(savedOpportunity);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
 * GET /api/opportunities
 * Purpose: Get ALL open opportunities
 * Access: Public (or Protected if you prefer)
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        // Fetch all opportunities and sort by newest first
        // .populate('created_by', 'username') adds the NGO's name to the result!
        const opportunities = await Opportunity.find()
            .sort({ date: 1 }) // Sort by event date
            .populate('created_by', 'username'); 
            
        res.json(opportunities);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;