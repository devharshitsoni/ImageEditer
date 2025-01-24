import React, { useState, useEffect } from "react";
import swap from "../assets/swap.png";
import search from "../assets/search.png";
import { useNavigate } from "react-router-dom";

const Gallery = ({ onSelectImage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false); // State to toggle tooltip visibility
  const [showOptions, setShowOptions] = useState(null); // Track which image's options to show
  const [galleryImages, setGalleryImages] = useState([
    // Manage gallery images state
    "https://plus.unsplash.com/premium_photo-1733514433474-e91aeaed25fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1736714384503-16a7bab63dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1736264335209-05960b7aa567?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // If the URL is /add-asset, prevent navigating back to the gallery without proper action
    const currentPath = window.location.pathname;
    if (currentPath !== "/gallery") {
      navigate("/gallery", { replace: true }); // This ensures the URL is always `/gallery`
    }
  }, []);

  const handleAddAsset = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file); // Generate file URL
      navigate("/add-asset", { state: { fileURL } }); // Pass the file URL to add-asset page
    }
  };

  const handleImageClick = (src) => {
    navigate("/add-asset", { state: { fileURL: src } });
  };

  const handleGLClick = () => {
    setShowTooltip((prev) => !prev); // Toggle tooltip visibility when GL is clicked
  };

  const handleOptionsClick = (index, event) => {
    event.stopPropagation(); // Prevent triggering parent click
    setShowOptions((prevIndex) => (prevIndex === index ? null : index)); // Toggle visibility of options
  };

  const handleEdit = (src) => {
    navigate("/add-asset", { state: { fileURL: src } }); // Open image for editing
  };

  const handleHide = (index, event) => {
    event.stopPropagation(); // Prevent triggering parent click
    setGalleryImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== index)
    );
  };

  const handleDelete = (index, event) => {
    event.stopPropagation(); // Prevent triggering parent click
    setGalleryImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== index)
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen bg-gray-100 p-4 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl pb-4">
        {/* Search Bar and Filter */}
        <div className="flex items-center gap-4 w-full">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pr-10 pl-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={search}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              alt="Search Icon"
            />
          </div>

          {/* Filter Options */}
          <div className="relative">
            <button
              className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <span>Filter</span>
              <img
                src={swap}
                alt="Arrow Icon"
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isFilterOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  <label className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      className="form-radio text-blue-500"
                    />
                    Newest First
                  </label>
                  <label className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      className="form-radio text-blue-500"
                    />
                    Oldest First
                  </label>
                  <label className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      className="form-radio text-blue-500"
                    />
                    A-Z
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Button */}
        <div className="relative">
          <button className="bg-[#334D6E] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#334d6eea] focus:outline-none">
            Add+
          </button>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleAddAsset}
          />
        </div>
      </div>

      {/* Scrollable Masonry Layout */}
      <div className="w-full max-w-6xl">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative mb-4 break-inside-avoid group cursor-pointer"
              onClick={() => handleImageClick(src)}
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full rounded-md shadow-md"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex flex-col justify-between opacity-0 group-hover:opacity-100 p-2 transition-opacity">
                <div className="flex justify-between items-center p-2 text-white">
                  <h3 className="text-sm">Project Name</h3>
                  <i
                    className="far fa-heart cursor-pointer hover:opacity-100 transition-opacity"
                    title="Like"
                  ></i>
                </div>
                <div className="flex justify-end items-center px-2 pb-2">
                  {/* GL Text with Tooltip */}
                  <div
                    className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer relative"
                    onClick={handleGLClick} // Trigger tooltip on click
                  >
                    <span className="cursor-pointer">GL</span>
                    {/* Tooltip */}
                    {showTooltip && (
                      <div className="absolute w-[100px] top-9 left-1/2 transform -translate-x-1/2 bg-white text-center p-2 rounded-md shadow-lg opacity-100 transition-opacity z-10">
                        <p className="text-[12px] font-[500] text-[#575c66]">
                          Gokul Lalasan
                        </p>
                        <p className="text-[12px] text-[#707683]">Feb 12, 2023</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="relative bg-white w-8 h-8 rounded-full ms-2 flex items-center justify-center cursor-pointer"
                    onClick={(event) => handleOptionsClick(index, event)} // Toggle options visibility
                  >
                    <i className="fas fa-ellipsis-h text-grey cursor-pointer"></i>
                    {/* Options Tooltip */}
                    {showOptions === index && (
                      <div className="absolute w-auto top-9 left-1/2 transform -translate-x-1/2 bg-white text-center p-2 rounded-md shadow-lg opacity-100 transition-opacity z-10">
                        <div
                          className="text-sm text-gray-700 hover:bg-gray-100 p-1 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(src);
                          }} // Open image for editing
                        >
                          Edit
                        </div>
                        <div
                          className="text-sm text-gray-700 hover:bg-gray-100 p-1 cursor-pointer"
                          onClick={(event) => handleHide(index, event)} // Hide image
                        >
                          Hide
                        </div>
                        <div
                          className="text-sm text-red-600 hover:bg-red-100 p-1 cursor-pointer"
                          onClick={(event) => handleDelete(index, event)} // Delete image
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
