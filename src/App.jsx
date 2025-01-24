import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./Components/FirstPage";
import Gallery from "./Components/Gallery";
import AddAsset from "./Components/AddAsset";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<FirstPage />} />

        {/* Gallery route */}
        <Route path="/gallery" element={<Gallery />} />

        {/* Add Asset route */}
        <Route path="/add-asset" element={<AddAsset />} />

        {/* 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
