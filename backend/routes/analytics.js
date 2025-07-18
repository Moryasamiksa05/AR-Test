const express = require('express');
const router = express.Router();
const {
  recordScan,
  getAnalytics,
} = require('../controllers/analyticsController');

router.post('/scan', recordScan);
router.get('/analytics', getAnalytics);

module.exports = router;
