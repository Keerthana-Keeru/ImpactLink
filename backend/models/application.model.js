// backend/models/application.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  // 1. Link to the Opportunity (The Event)
  opportunity: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  // 2. Link to the Volunteer (The User applying)
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  // 3. Status of the application
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected','completed'],
    default: 'pending'
  },
  applicantName: { type: String, required: true }, // For Certificate & NGO
  applicantPhone: { type: String, required: true }, // For NGO Contact
  motivation: { type: String, required: true }, // "Why do you want to join?"
  experience: { type: String }, // "Do you have prior experience?"
  // 4. Timestamp
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicates: One volunteer cannot apply to the same event twice
applicationSchema.index({ opportunity: 1, volunteer: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;