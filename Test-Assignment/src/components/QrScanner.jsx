import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    console.log("QrScanner mounted"); 
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    }, true); // verbose logging

    scanner.render(
      (decodedText, decodedResult) => {
        scanner.clear().then(() => {
          onScanSuccess(decodedText);
        }).catch(err => console.error("Clear error", err));
      },
      (errorMessage) => {
        // QR scan errors (ignore or log)
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return <div id="reader" className="my-4" />;
};

export default QrScanner;
