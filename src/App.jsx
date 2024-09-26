import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectInfoForm from "./ProjectInfoForm"; // Import the component
import BridgeForm from './BridgeForm';
import Report from './Report';

const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<ProjectInfoForm />} />  {/* Render the form at the root path */}
        <Route path="/bridgeform" element={<BridgeForm />} />
        <Route path="/report" element={<Report />} />
        
        </Routes>
    </Router>
  );
};

export default App;