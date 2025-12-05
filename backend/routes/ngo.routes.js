// backend/routes/ngo.routes.js

const router = require('express').Router();
const Ngo = require('../models/ngo.model');
const verifyToken = require('../middleware/auth.middleware'); // Guard the route!

/*
 * POST /api/ngo/profile
 * Purpose: Create or Update the NGO's profile
 */
router.post('/profile', verifyToken, async (req, res) => {
    
    // Get data from the form
    const { organizationName, missionStatement, website, address, contactPhone,youtubeLink} = req.body;

    // Build the profile object
    const profileFields = {
        user: req.user.id, // Get the ID from the token (the logged-in user)
        organizationName,
        missionStatement,
        website,
        address,
        contactPhone,
        youtubeLink
    };

    try {
        // 1. Check if profile already exists
        let ngo = await Ngo.findOne({ user: req.user.id });

        if (ngo) {
            // UPDATE existing profile
            ngo = await Ngo.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(ngo);
        }

        // 2. CREATE new profile
        ngo = new Ngo(profileFields);
        await ngo.save();
        res.json(ngo);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
 * GET /api/ngo/profile
 * Purpose: Get the current logged-in NGO's profile
 */
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const ngo = await Ngo.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
        
        if (!ngo) {
            return res.status(404).json({ msg: 'There is no profile for this NGO' });
        }
        res.json(ngo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
/*
 * GET /api/ngo/all
 * Purpose: List ALL NGOs so volunteers can browse them
 * Access: Public (or Protected)
 */
router.get('/all', async (req, res) => {
    try {
        const ngos = await Ngo.find().populate('user', ['username', 'email']);
        res.json(ngos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;