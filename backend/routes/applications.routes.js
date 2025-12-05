// backend/routes/applications.routes.js

const router = require('express').Router();
const Application = require('../models/application.model');
const verifyToken = require('../middleware/auth.middleware');
const Opportunity = require('../models/opportunity.model'); // Need this model to find NGO's events
/*
 * POST /api/applications/:id
 * Purpose: Apply for a specific opportunity
 */
router.post('/:id', verifyToken, async (req, res) => {
    try {
        const opportunityId = req.params.id;
        const volunteerId = req.user.id; // From the token
        const { motivation, experience, applicantName, applicantPhone} = req.body;

        // 1. Check if already applied
        const existingApp = await Application.findOne({ 
            opportunity: opportunityId, 
            volunteer: volunteerId 
        });

        if (existingApp) {
            return res.status(400).json({ msg: 'You have already applied to this event.' });
        }

        // 2. Create new application
        const newApp = new Application({
            opportunity: opportunityId,
            volunteer: volunteerId, motivation,experience,applicantName, // <--- Save it
            applicantPhone // <--- Save it // Save answer
              // Save answer
        });

        await newApp.save();
        res.json({ msg: 'Application successful!', applicationId: newApp._id });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
 * GET /api/applications/my-applications
 * Purpose: See all events I have applied to
 */
/*
 * GET /api/applications/my-applications
 * Purpose: See all events I have applied to
 */
router.get('/my-applications', verifyToken, async (req, res) => {
    try {
        const apps = await Application.find({ volunteer: req.user.id })
            // 1. Get the Volunteer's details (for the fallback name)
            .populate('volunteer', 'username email')
            // 2. Get the Opportunity AND the NGO who created it (Deep Populate)
            .populate({
                path: 'opportunity',
                populate: {
                    path: 'created_by', // This is the NGO User ID inside Opportunity
                    select: 'username'  // We only want their name
                }
            });

        res.json(apps);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/ngo-applications', verifyToken, async (req, res) => {
    try {
        // 1. Find all events created by this NGO
        const myOpportunities = await Opportunity.find({ created_by: req.user.id });
        
        // 2. Get just the IDs of those events
        const opportunityIds = myOpportunities.map(op => op._id);

        // 3. Find applications that match those Event IDs
        const applications = await Application.find({ opportunity: { $in: opportunityIds } })
            .populate('volunteer', 'username email') // Show Volunteer's name
            .populate('opportunity', 'title date');  // Show Event details

        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
 * PATCH /api/applications/:id/update-status
 * Purpose: NGO Accepts or Rejects a volunteer
 */
router.patch('/:id/update-status', verifyToken, async (req, res) => {
    const { status } = req.body; // Expect 'accepted' or 'rejected'

    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ msg: 'Application not found' });

        // Update the status
        application.status = status;
        await application.save();

        res.json({ msg: `Application ${status} successfully`, application });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
module.exports = router;