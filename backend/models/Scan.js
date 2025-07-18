const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
  timeSpent: Number
});

module.exports = mongoose.model('Scan', ScanSchema);
