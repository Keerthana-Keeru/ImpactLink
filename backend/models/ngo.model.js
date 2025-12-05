// backend/models/ngo.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  // This is the LINK to the 'users' collection
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One User account = One NGO Profile
  },
  organizationName: {
    type: String,
    required: true
  },
  missionStatement: {
    type: String
  },
  website: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String
  },
  youtubeLink: { // <--- ADD THIS NEW FIELD
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false // We can verify them later
  }
}, {
  timestamps: true // Automatically saves createdAt and updatedAt
});

const Ngo = mongoose.model('Ngo', ngoSchema);
module.exports = Ngo;