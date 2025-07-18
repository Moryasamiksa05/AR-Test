const Scan = require('../models/Scan');

exports.recordScan = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { timeSpent } = req.body;

    const scan = new Scan({ ip, userAgent, timeSpent });
    await scan.save();
    res.status(201).json({ message: 'Scan recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const scans = await Scan.find();
    const totalScans = scans.length;

    const uniqueUsers = new Set(scans.map(scan => scan.ip)).size;
    const avgTime =
      totalScans === 0
        ? 0
        : Math.round(
            scans.reduce((acc, s) => acc + (s.timeSpent || 0), 0) / totalScans
          );

    res.json({
      totalScans,
      uniqueUsers,
      avgTimeSpent: `${avgTime}s`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
