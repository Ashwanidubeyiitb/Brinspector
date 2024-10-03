import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectInfoForm from "./ProjectInfoForm";
import ImageUpload from "../ImageUpload";
import ConditionSurveyForm from "./ConditionSurveyForm";
import VisualInspection from "./VisualInspection"
import BridgeForm from './BridgeForm';
import Report from './Report';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route - Project Information Form */}
        <Route path="/" element={<ProjectInfoForm />} /> 

        {/* Image Upload Form Route */}
        <Route path="/ImageUpload" element={<ImageUpload />} />

        {/* Condition Survey Form Route */}
        <Route path="/ConditionSurveyForm" element={<ConditionSurveyForm />} />

        {/* Visual Inspection Form Route */}
        <Route path="/VisualInspection" element={<VisualInspection />} />

        {/* Bridge Form Route */}
        <Route path="/bridgeform" element={<BridgeForm />} />

        {/* Report Route */}
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;
