import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as fabric from "fabric"; // v6

const CanvaPage = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const imageUrl = location.state?.imageUrl || "";

  const testImageUrl = "https://via.placeholder.com/800x600.png";

  useEffect(() => {
    // Dispose of existing canvas instance if it exists
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    // Create a new fabric.Canvas instance
    const canvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    canvasRef.current = canvas;

    if (imageUrl) {
      console.log("Loading image from URL:", imageUrl);

    fabric.Image.fromURL(
  imageUrl,
  (img) => {
    img.set({
      left: 50, // Manually set a visible position
      top: 50,
      width: 400, // Manually set dimensions
      height: 300,
      selectable: false,
    });

    canvas.add(img);
    img.sendToBack();
    canvas.renderAll();
  },
  { crossOrigin: "anonymous" } // Handle CORS issues
      );
    } else {
      console.error("No image URL provided or URL is invalid");
    }

    return () => {
      // Dispose of the canvas instance when the component unmounts
      canvas.dispose();
    };
  }, [imageUrl]);

  const addTextLayer = () => {
    const canvas = canvasRef.current;
    const text = new fabric.Textbox("Add your caption here", {
      left: 50,
      top: 50,
      fontSize: 20,
      editable: true,
    });
    canvas.add(text);
    text.bringToFront(); // Ensure text is on top of shapes and image
    canvas.renderAll();
  };

  const addShape = (shapeType) => {
    const canvas = canvasRef.current;
    let shape;

    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          left: 50,
          top: 50,
          radius: 50,
          fill: "blue",
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          left: 50,
          top: 50,
          width: 100,
          height: 60,
          fill: "green",
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          left: 50,
          top: 50,
          width: 80,
          height: 100,
          fill: "red",
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 50 },
          ],
          {
            left: 50,
            top: 50,
            fill: "purple",
          }
        );
        break;
      default:
        break;
    }

    if (shape) {
      canvas.add(shape);
      shape.moveTo(canvas.getObjects().length - 1); // Ensure shapes are above the image
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();
  };

  return (
    <>
<div>
  <h1>Add caption</h1>
</div>
    <div className="canvas-container" style={{ position: "relative", marginTop: "20px" }}>
      <canvas id="canvas"></canvas>
      <div className="controls">
        <button onClick={addTextLayer}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={() => addShape("polygon")}>Add Polygon</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
    </div>
    </>
  );
};

export default CanvaPage;
