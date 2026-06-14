const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlewares/auth.middleware.js');
const Lead = require('../models/Lead.models.js');

// Get Leads (Sales Reps see only their own; Managers/Admins see all)
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'Sales_Rep' ? { assignedTo: req.user.id } : {};
    const leads = await Lead.find(query).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create Lead
router.post('/', auth, authorize(['Admin', 'Sales_Manager']), async (req, res) => {
  const { companyName, contactName, email, value, assignedTo } = req.body;
  try {
    const newLead = new Lead({ companyName, contactName, email, value, assignedTo });
    const lead = await newLead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update Lead Stage
router.patch('/:id/stage', auth, async (req, res) => {
  const { stage } = req.body;
  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    // Enforce data ownership for Sales Reps
    if (req.user.role === 'Sales_Rep' && lead.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    lead.stage = stage;
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Log Activity
router.post('/:id/activity', auth, async (req, res) => {
  const { type, notes } = req.body;
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    lead.activities.unshift({ type, notes });
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


router.get('/dashboard/analytics', auth, authorize(['Admin', 'Sales_Manager']), async (req, res) => {
  try {
    const analytics = await Lead.aggregate([
      { $group: { _id: "$stage", totalValue: { $sum: "$value" }, count: { $sum: 1 } } }
    ]);
    res.json(analytics);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;