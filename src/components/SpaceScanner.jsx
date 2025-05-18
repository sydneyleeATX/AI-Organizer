import React, { useRef, useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const SpaceScanner = ({ onScanComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      const model = await cocoSsd.load();
      setModel(model);
    };
    loadModel();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const detectObjects = async () => {
    if (!model || !videoRef.current) return;

    const predictions = await model.detect(videoRef.current);
    setDetectedObjects(predictions);

    // Draw predictions on canvas with size estimation
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Add reference object for scale (e.g., A4 paper)
    const referenceObject = predictions.find(p => p.class.toLowerCase() === 'paper' || p.class.toLowerCase() === 'book');
    let referenceScale = 1; // Default scale, will be adjusted if reference found

    if (referenceObject) {
      // A4 paper is 297mm x 210mm
      const paperHeight = 297; // mm
      referenceScale = paperHeight / referenceObject.bbox[3];
    }

    predictions.forEach((prediction, index) => {
      const { bbox, class: className, score } = prediction;
      const [x, y, width, height] = bbox;
      
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      // Calculate estimated real-world dimensions
      const estimatedHeight = Math.round(height * referenceScale);
      const estimatedWidth = Math.round(width * referenceScale);
      
      ctx.font = '16px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText(`${className} (${score.toFixed(2)})`, x, y - 10);
      ctx.fillText(`~${estimatedWidth}mm x ${estimatedHeight}mm`, x, y - 25);
    });
  };

  const handleScan = async () => {
    if (!detectedObjects.length) {
      alert('Please scan the space first!');
      return;
    }
    
    // Generate space layout based on detected objects
    const layout = detectedObjects.map((obj, index) => ({
      id: index,
      type: obj.class,
      position: { x: obj.bbox[0], y: obj.bbox[1] },
      size: { width: obj.bbox[2], height: obj.bbox[3] }
    }));

    onScanComplete(layout);
  };

  return (
    <div className="space-scanner">
      <h2>Space Scanner</h2>
      <button onClick={startCamera}>Start Camera</button>
      <div className="scanner-container">
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          playsInline
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      <button onClick={detectObjects}>Detect Objects</button>
      <button onClick={handleScan}>Generate Layout</button>
    </div>
  );
};

export default SpaceScanner;
