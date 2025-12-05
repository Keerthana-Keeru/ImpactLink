// backend/models/user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * WHAT: This is the User "Blueprint" (Schema).
 * WHY: It defines the structure for every user in our app.
 * This model will handle the LOGIN information (email/password)
 * for *both* volunteers and NGOs.
 */
const userSchema = new Schema({
    // 'username' is for display, e.g., "JohnD"
    username: {
        type: String,
        required: true, // You must provide a username
        unique: true,   // No two users can share this username
        trim: true,     // Removes extra spaces
        minlength: 3   // Must be at least 3 characters
    },
    // 'email' is for logging in and contact
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Stores 'Email@Test.com' as 'email@test.com'
    },
    // 'password' will be stored securely (we'll do this later)
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    /*
     * This 'role' field is the most important part.
     * It's how we know if a user is a regular 'volunteer'
     * or an 'ngo' (organization).
     */
    role: {
        type: String,
        required: true,
        enum: ['volunteer', 'ngo', 'admin'], // The value MUST be one of these
        default: 'volunteer' // New users are 'volunteer' by default
    },

}, {
    // 'timestamps: true' automatically adds "createdAt" and "updatedAt" fields
    timestamps: true,
});

// This turns our 'userSchema' blueprint into a usable 'User' model.
const User = mongoose.model('User', userSchema);

// This 'exports' the model so other files in our project (like our server) can use it.
module.exports = User;