import React, { useState } from "react";
import AddAsset from "./AddAsset"; // Import the AddAsset component
import image from "../assets/firstimage.png";

const Firstpage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddAsset, setShowAddAsset] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (e.g., images only)
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowAddAsset(true); // Show the AddAsset page with animation
    }
  };

  const handleCloseAddAsset = () => {
    setShowAddAsset(false); // Close the AddAsset page
    setSelectedImage(null); // Reset the selected image
  };

  return (
    <>
      {showAddAsset ? (
        <AddAsset image={selectedImage} onClose={handleCloseAddAsset} />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
              <img
                src={image}
                alt="Empty Box Illustration"
                className="h-[258px] w-[214px]"
              />
            </div>
            <h2 className="text-gray-500 text-lg mb-4">Add Assets here</h2>
            <button
              onClick={() => document.getElementById("imageInput").click()}
              className="flex items-center justify-center px-6 py-2 bg-[#334D6E] text-white font-semibold rounded-md hover:bg-[#24364d] transition duration-500"
            >
              <span className="text-xl mr-2">+</span> Add
            </button>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Firstpage;
