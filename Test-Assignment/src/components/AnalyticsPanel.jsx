const AnalyticsPanel = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-4 my-6">
      <h2 className="text-xl font-semibold mb-4">Campaign Analytics</h2>
      <ul className="space-y-2 text-gray-700">
        <li>🔁 Total Scans: <strong>{stats.totalScans}</strong></li>
        <li>👤 Unique Users: <strong>{stats.uniqueUsers}</strong></li>
        <li>⏱ Avg. Time Spent: <strong>{stats.avgTimeSpent}</strong></li>
      </ul>
    </div>
  );
};

export default AnalyticsPanel;
