import React, { useState } from "react";
import ARViewer from "./components/ARViewer";
import CTAButton from "./components/CTAButton";
import AnalyticsPanel from "./components/AnalyticsPanel";
import QrScanner from "./components/QrScanner";
import API from "./api";

const App = () => {
  const [scanned, setScanned] = useState(false);
  const [stats, setStats] = useState(null);

  const handleScan = async (qrData) => {
    setScanned(true);
    console.log("Scanned QR:", qrData);

    try {
      // Log the scan to backend with random time spent
      await API.post("/scan", {
        timeSpent: Math.floor(Math.random() * 30 + 10),
      });

      // Fetch updated analytics
      const res = await API.get("/analytics");
      setStats(res.data);
    } catch (err) {
      console.error("Scan failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          🧠 Experience Print Come to Life
        </h1>
        <p className="text-gray-600 text-lg">
          Trigger an interactive AR campaign in just one tap.
        </p>
      </div>

      {!scanned ? (
        <QrScanner onScanSuccess={handleScan} />
      ) : (
        <>
          <ARViewer />
          <CTAButton />
          <AnalyticsPanel stats={stats} />
        </>
      )}
    </div>
  );
};

export default App;
