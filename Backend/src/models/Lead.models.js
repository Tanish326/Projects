
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { 
    type: String, 
    enum: ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'], 
    default: 'Lead' 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activities: [{
    type: { type: String, enum: ['Email', 'Call', 'Meeting'], required: true },
    notes: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);