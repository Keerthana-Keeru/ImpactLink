require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// --- 1. DEFINE THE PORT (This was missing!) ---
const port = process.env.PORT;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
// (Ideally use process.env.MONGO_URI, but this works for now)
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB database connection established successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- ROUTES ---

// Auth Routes
const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

// NGO Routes
const ngoRouter = require('./routes/ngo.routes');
app.use('/api/ngo', ngoRouter);

// Application Routes
const applicationsRouter = require('./routes/applications.routes');
app.use('/api/applications', applicationsRouter);

// Opportunity Routes
const opportunitiesRouter = require('./routes/opportunities.routes');
app.use('/api/opportunities', opportunitiesRouter);

// Feedback Routes
const feedbackRouter = require('./routes/feedback.routes');
app.use('/api/feedback', feedbackRouter);

// Volunteer Routes
const volunteerRouter = require('./routes/volunteer.routes');
app.use('/api/volunteer', volunteerRouter);

// --- Basic Route ---
app.get('/', (req, res) => {
    res.send('Hello from ImpactLink Backend!');
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});