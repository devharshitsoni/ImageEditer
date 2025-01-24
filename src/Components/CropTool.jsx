import React, { useRef, useState } from "react";

const CropTool = ({ image, onCancel, onCrop }) => {
  const [cropBox, setCropBox] = useState({ top: 50, left: 50, width: 300, height: 300 });
  const imgRef = useRef(null);

  const handleCrop = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = cropBox.width;
    canvas.height = cropBox.height;

    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    ctx.drawImage(
      img,
      cropBox.left * scaleX,
      cropBox.top * scaleY,
      cropBox.width * scaleX,
      cropBox.height * scaleY,
      0,
      0,
      cropBox.width,
      cropBox.height
    );

    onCrop(canvas.toDataURL());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative">
        {/* Image with Cropping Box */}
        <img
          ref={imgRef}
          src={image}
          alt="Crop"
          className="max-w-full max-h-screen"
          style={{ position: "relative" }}
        />
        <div
          style={{
            position: "absolute",
            top: cropBox.top,
            left: cropBox.left,
            width: cropBox.width,
            height: cropBox.height,
            border: "2px solid #4A90E2",
            resize: "both",
            overflow: "hidden",
          }}
          draggable
          onDragEnd={(e) => {
            setCropBox((prev) => ({
              ...prev,
              top: e.clientY,
              left: e.clientX,
            }));
          }}
        ></div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 space-x-4">
        <button onClick={handleCrop} className="bg-green-500 text-white px-4 py-2 rounded">
          ✓
        </button>
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
          ✕
        </button>
      </div>
    </div>
  );
};

export default CropTool;
