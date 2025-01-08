import React, { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import {
  FaPaintBrush,
  FaSave,
  FaSyncAlt,
  FaUndo,
  FaTrash,
} from "react-icons/fa";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [brushClicked, SetbrushClicked] = useState(false);
  const [savedData, setSavedData] = useState("");
  const [brushColor, setBrushColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color
  const [brushRadius, setBrushRadius] = useState(3); // Default brush radius
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saveDrawing = () => {
    if (canvasRef.current) {
      setSavedData(canvasRef.current.getSaveData());
      alert("Drawing saved!");
    }
  };

  const loadDrawing = () => {
    if (canvasRef.current && savedData) {
      canvasRef.current.loadSaveData(savedData);
    }
  };

  const clearDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const undoDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleBrushRadiusChange = (value) => {
    const radius = Math.max(1, Math.min(15, value)); // Ensure the value is between 1 and 8
    setBrushRadius(radius);
  };

  const BrushClick = () => {
    SetbrushClicked(!brushClicked);
    console.log(brushClicked);
    console.log("brushClicked");
  };

  return (
    <div>
      <nav
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          textAlign: "center",
          position: "sticky",
          top: "10px",
          left: "35%",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          maxWidth: "max-content",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="brushColor" style={{ cursor: "pointer" }}>
          <input
            title="Brush Color"
            style={{
              width: "20px",
              height: "20px",
              margin: "0",
              padding: "0",
              cursor: "pointer",
            }}
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
        <br />
        <div
          style={{ position: "relative", display: "flex", cursor: "pointer" }}
        >
          <FaPaintBrush title="Brush Size" size={30} onClick={BrushClick} />

          <input
            className="brushRadius"
            type="range"
            min="1"
            max="15"
            value={brushRadius}
            onChange={(e) => handleBrushRadiusChange(Number(e.target.value))}
            style={{
              display: brushClicked ? "flex" : " none",
              marginLeft: "10px",
              // transform: "transformX(10px)",
              position: "relative",
              // top:"20px"
              // Adjust the width to suit the design
              // Adjust spacing if necessary
            }}
          />
          <div
            style={{
              display: brushClicked ? "flex" : "none",
              justifyContent: "center",
              alignContent: "center",
              margin: "5px",
            }}
          >
            {brushRadius}
          </div>
        </div>
        <br />

        <br />
        <label>
          Background:{" "}
          <input
            style={{ cursor: "pointer" }}
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
        <FaSave
          size={20}
          title="Save"
          onClick={saveDrawing}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />

        <FaSyncAlt
          title="Load"
          onClick={loadDrawing}
          style={{
            marginRight: "10px",
            fontSize: "20px",
            color: "green",
            cursor: "pointer",
            //   animation: "spin 1s linear infinite",
          }}
        />

        <FaTrash
          title="Delete"
          onClick={clearDrawing}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />

        <FaUndo
          onClick={undoDrawing}
          title="Undo"
          style={{
            fontSize: "20px",
            cursor: "pointer",
          }}
        />
      </nav>
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "absolute", top: "0", left: "0" }}>
          <CanvasDraw
            ref={canvasRef}
            canvasWidth={canvasDimensions.width}
            canvasHeight={canvasDimensions.height}
            brushColor={brushColor}
            lazyRadius={1}
            brushRadius={brushRadius}
            hideGrid={true}
            backgroundColor={backgroundColor} // Set the background color here
          />
        </div>
        <div style={{ marginTop: "20px" }}></div>
      </div>
    </div>
  );
};

export default Whiteboard;
