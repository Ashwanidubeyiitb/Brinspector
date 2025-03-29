import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectInfoForm from "./ProjectInfoForm";
import ImageUpload from "../ImageUpload";
import ChainageData from "./ChainageData";
import ConditionSurveyForm from "./ConditionSurveyForm";
import VisualInspection from "./VisualInspection";
import BridgeRatingForm from './BridgeRatingForm';
import Report from './Report';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProjectsPage from './ProjectsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Projects Page */}
        <Route path="/projects" element={<ProjectsPage />} />
        
        {/* Project Information Form */}
        <Route path="/project-info" element={<ProjectInfoForm />} />
        <Route path="/project-info/:id" element={<ProjectInfoForm />} />
        
        {/* Image Upload Route */}
        <Route path="/image-upload" element={<ImageUpload />} />
        
        {/* Chainage Data Route */}
        <Route path="/ChainageData" element={<ChainageData />} />
        
        {/* Condition Survey Form Route */}
        <Route path="/ConditionSurveyForm" element={<ConditionSurveyForm />} />
        
        {/* Visual Inspection Form Route */}
        <Route path="/VisualInspection" element={<VisualInspection />} />
        
        {/* Bridge Form Route */}
        <Route path="/bridgeratingform" element={<BridgeRatingForm />} />
        
        {/* Report Route */}
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;
