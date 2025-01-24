import React, { useState, useRef, useEffect } from "react";
import editIcon from "../assets/edit.png";
import closeIcon from "../assets/close.png";
import cropIcon from "../assets/crop.png";
import rotateIcon from "../assets/refresh.png";
import flipHorizontalIcon from "../assets/flip-h.png";
import flipVerticalIcon from "../assets/flip-v.png";
import replaceIcon from "../assets/replace.png";

const EditableImage = ({ image, onImageChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [imageFile, setImageFile] = useState(image);
  const imgRef = useRef(null);

  const handleOptionClick = (action) => {
    switch (action) {
      case "crop":
        alert("Crop functionality to be implemented");
        break;
      case "rotate":
        setRotate((prev) => (prev + 90) % 360);
        break;
      case "flipHorizontal":
        setScaleX((prev) => prev * -1);
        break;
      case "flipVertical":
        setScaleY((prev) => prev * -1);
        break;
      case "replace":
        document.getElementById("imageUploader").click();
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageFile(event.target.result);
        if (onImageChange) onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full">
      {/* Image Display */}
      <div className="relative overflow-hidden">
        <img
          ref={imgRef}
          src={imageFile}
          alt="Editable"
          className="rounded-md"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "contain",
            transform: `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
            transition: "transform 0.5s ease", // Smooth animation for transformations
            transformOrigin: "center",
          }}
        />

        {/* Pencil Icon */}
        <button
          className={`absolute top-2 right-2 p-2 transition-transform duration-500 ${
            isEditing ? "rotate-90" : "rotate-0"
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          <img
            src={isEditing ? closeIcon : editIcon}
            alt="Edit"
            className="w-9 h-9 relative top-3  bg-[#000000c1]"
          />
        </button>
      </div>

      {/* Editing Options */}
      {isEditing && (
  <div className="absolute top-[10.4%] right-7 bg-[#000000c1] text-white flex flex-col items-center space-y-0 opacity-0 animate-fade-in">
    {[ // Options array
      { action: "crop", label: "Crop", icon: cropIcon },
      { action: "rotate", label: "Rotate", icon: rotateIcon },
      {
        action: "flipHorizontal",
        label: "Flip Horizontally",
        icon: flipHorizontalIcon,
      },
      {
        action: "flipVertical",
        label: "Flip Vertically",
        icon: flipVerticalIcon,
      },
      { action: "replace", label: "Replace", icon: replaceIcon },
    ].map(({ action, label, icon }, idx) => (
      <div
        key={idx}
        className="relative group cursor-pointer p-2 opacity-0 animate-option-appear"
        style={{ animationDelay: `${idx * 100}ms` }}
        onClick={() => handleOptionClick(action)}
      >
        {/* Make icons maintain aspect ratio */}
        <img
          src={icon}
          alt={label}
          className="w-5 h-auto object-contain" // Ensure consistent sizing
        />
        {/* Tooltip */}
        <div className="absolute left-[-120px] top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
          {label}
        </div>
      </div>
    ))}
  </div>
)}


      {/* Hidden File Input for Image Replacement */}
      <input
        id="imageUploader"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default EditableImage;

