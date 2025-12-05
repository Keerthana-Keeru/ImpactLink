// backend/routes/feedback.routes.js
const router = require('express').Router();
const Feedback = require('../models/feedback.model');
const verifyToken = require('../middleware/auth.middleware');

// POST /api/feedback
router.post('/', verifyToken, async (req, res) => {
    try {
        const { ngoId, opportunityId, rating, message } = req.body;
        console.log("Received Feedback Data:", req.body);

        const newFeedback = new Feedback({
            volunteer: req.user.id,
            ngo: ngoId,
            opportunity: opportunityId,
            rating,
            message
        });

        await newFeedback.save();
        res.json({ msg: 'Feedback submitted successfully!' });
    } catch (err) {
        console.error("Error Saving Feedback:", err);
        res.status(500).send('Server Error');
    }
});

// GET /api/feedback/my-reviews
router.get('/my-reviews', verifyToken, async (req, res) => {
    try {
        console.log("Fetching reviews for NGO User ID:", req.user.id);

        // 1. Find the feedback
        const reviews = await Feedback.find({ ngo: req.user.id })
            .populate('volunteer', 'username email')
            .populate('opportunity', 'title');
            
        console.log("Reviews Found:", reviews);
        res.json(reviews);

    } catch (err) {
        console.error("Error Fetching Reviews:", err); // <--- CHECK YOUR TERMINAL FOR THIS
        res.status(500).send('Server Error');
    }
});

module.exports = router;