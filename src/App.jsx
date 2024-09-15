import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BridgeForm from './BridgeForm'; // Assuming you have this component
import Report from './Report';
const App = () => {
  return (
    <Router>
    <Routes>


        <Route path="/" element={<BridgeForm />} />
        {/* You can uncomment the following line when the Report component is ready */}
        <Route path="/report" element={<Report />} />
        </Routes>
    </Router>
  );
};

export default App;
