import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import upload from "../assets/upload-image-icon.png"; // Your upload icon
import tag from "../assets/tag.png"; // Your tag icon
import Gallery from "./Gallery";
import { useLocation, useNavigate } from "react-router-dom";

const AddAsset = ({ image, onClose }) => {
  const [isVisible, setIsVisible] = useState(true); // Initially set to true to make the component visible
  const [view, setView] = useState("addAsset");
  const [currentImage, setCurrentImage] = useState(image || ""); // Initialize with the passed image or an empty string
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Update currentImage with the passed fileURL from location state
    if (location.state?.fileURL) {
      setCurrentImage(location.state.fileURL);
    }
  }, [location.state]);

  const handleClose = () => {
    setIsVisible(false); // Start the hide transition
    setTimeout(() => {
      navigate("/gallery"); // Navigate back to the gallery page
      if (onClose) onClose(); // Safely call onClose after transition
    }, 500);
  };

  const handleUploadClick = () => {
    setView("gallery");
  };

  const handleImageSelect = (selectedImage) => {
    if (!selectedImage) {
      console.error("No image selected.");
      return;
    }
    console.log("Selected image:", selectedImage); // Debugging the selected image
    setCurrentImage(selectedImage); // Update the current image state

    // Update the URL state using navigate
    navigate("/addasset", { state: { fileURL: selectedImage } });

    setView("addAsset"); // Return to "addAsset" view
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full p-4 inset-0 z-10 transform transition-transform duration-500 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {view === "addAsset" && (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-4">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold text-gray-700">Add Asset</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:gap-4">
            {/* Left Section - EditableImage */}
            <div className="sm:w-2/3">
              {currentImage ? (
                <EditableImage
                  image={currentImage}
                  onImageChange={(newImage) => setCurrentImage(newImage)} // Handle image changes
                />
              ) : (
                <p className="text-gray-500">No image available to edit</p>
              )}
            </div>

            {/* Right Section - Form */}
            <div className="sm:w-1/3 flex flex-col gap-4 relative">
              <input
                type="text"
                placeholder="Asset 001"
                className="border border-gray-300 rounded-md text-black p-2 focus:outline "
              />
              <textarea
                placeholder="Enter Description"
                className="border border-gray-300 rounded-lg p-2 h-32 resize-none focus:outline"
              ></textarea>

              <div className="flex flex-wrap gap-2 mb-[60px]">
                {[{ label: "Space", icon: tag }, { label: "Style", icon: tag }, { label: "Package", icon: tag }, { label: "Elements", icon: tag }].map(
                  ({ label, icon }, idx) => (
                    <button
                      key={idx}
                      className="flex items-center px-2 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                      <img src={icon} alt={`${label} Icon`} className="w-4 h-4 mr-2" />
                      {label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-2 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )
                )}
              </div>

              {/* Upload Button */}
              <button
                className="absolute bottom-0 right-0 w-full flex items-center justify-center px-6 py-3 bg-[#334D6E] text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
                onClick={handleUploadClick} // This opens the gallery
              >
                <img src={upload} className="mr-2" alt="Upload Icon" />
                Upload Image
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "gallery" && (
        <Gallery
          onClose={() => setView("addAsset")} // Close gallery and return to addAsset view
          onSelectImage={handleImageSelect} // Handle image selection from the gallery
        />
      )}
    </div>
  );
};

export default AddAsset;
