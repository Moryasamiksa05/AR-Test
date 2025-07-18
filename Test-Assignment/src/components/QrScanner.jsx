
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const QrScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const scanInterval = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [lastToastTime, setLastToastTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
      if (scanInterval.current) {
        clearInterval(scanInterval.current);
      }
    };
  }, []);

  const handleReset = () => {
    setSelectedFile(null);
    setScanError(false);
    setScanning(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
    }
  };

  const startScan = async () => {
    try {
      setScanning(true);
      setScanError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        await videoRef.current.play();
      }

      scanInterval.current = setInterval(async () => {
        try {
          const result = await codeReader.current.decodeFromVideoElement(videoRef.current);
          if (result) {
            clearInterval(scanInterval.current);
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            setScanning(false);

            toast.success('✅ QR Code scanned!');

            const dummyStats = {
              totalScans: 120,
              uniqueUsers: 88,
              avgTimeSpent: '3m 15s',
            };

            navigate('/analytics', {
              state: {
                scannedData: result.getText(),
                stats: dummyStats,
              },
            });

            if (onScanSuccess) onScanSuccess(result.getText());
          }
        } catch (err) {
          if (err instanceof NotFoundException) {
            const now = Date.now();
            if (now - lastToastTime > 3000) {
              setLastToastTime(now);
              toast.dismiss();
              toast.info("📷 Still scanning for QR...");
            }
          } else {
            console.error('Unexpected scan error:', err);
            toast.error("Camera error occurred.");
            setScanError(true);
            clearInterval(scanInterval.current);
          }
        }
      }, 1500);

    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Camera access denied or unavailable.');
      setScanError(true);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setScanError(false);

    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      try {
        const result = await codeReader.current.decodeFromImage(img);
        toast.success('✅ QR Code from image detected!');

        const dummyStats = {
          totalScans: 120,
          uniqueUsers: 88,
          avgTimeSpent: '3m 15s',
        };

        navigate('/analytics', {
          state: {
            scannedData: result.getText(),
            stats: dummyStats,
          },
        });

        if (onScanSuccess) onScanSuccess(result.getText());
      } catch (err) {
        toast.error('❌ No QR code found in the uploaded image.');
        console.error('Image scan failed:', err);
        setScanError(true);
      }
    };

    img.onerror = () => {
      toast.error('❌ Failed to load image.');
      setScanError(true);
    };
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">QR Scanner</h1>

      <div className="space-x-2 mb-4">
        <button
          onClick={startScan}
          disabled={scanning}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow"
        >
          {scanning ? 'Scanning...' : 'Camera Mode'}
        </button>

        <label className="bg-blue-500 text-white px-4 py-2 rounded shadow cursor-pointer">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4">
          <p>Chosen File: {selectedFile.name}</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="max-w-xs mx-auto mt-2 rounded shadow"
          />
        </div>
      )}

      {scanError && (
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
        >
          Reset & Try Again
        </button>
      )}

      <video
        ref={videoRef}
        className="w-full max-w-md mx-auto mt-4 rounded shadow"
      />
    </div>
  );
};

export default QrScanner;
