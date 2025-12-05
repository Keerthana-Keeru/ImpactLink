// backend/models/volunteer.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  // Link to the Login Account
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: { type: String },
  lastName: { type: String },
  profilePic: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  phoneNumber: { type: String },
  address: { type: String },
  
  // Skills: e.g., ["Teaching", "Cooking", "First Aid"]
  skills: { 
    type: [String], 
    default: [] 
  },
  
  // Interests: e.g., "Environment", "Education"
  interests: { type: String },
  
  availability: { type: String } // e.g., "Weekends", "Weekdays"
}, {
  timestamps: true
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;