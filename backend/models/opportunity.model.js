// backend/models/opportunity.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  // Link to the NGO who created it
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  }
}, {
  timestamps: true
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
module.exports = Opportunity;