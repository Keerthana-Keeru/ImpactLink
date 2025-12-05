const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ngo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true }
}, { timestamps: true });
feedbackSchema.index({ volunteer: 1, opportunity: 1 }, { unique: true });
// IMPORTANT: This line exports the model so routes can use it
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;