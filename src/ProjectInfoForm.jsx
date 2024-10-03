import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectInfoForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    consultantName: '',
    inspectionDate: '',
    popularName: '',
    riverName: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data into localStorage to share between components
    localStorage.setItem('projectInfo', JSON.stringify(formData));
    navigate('/ImageUpload'); 
  };

  return (
    <div>
      <h2>Project Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name of the Client:
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name of Consultant:
          <input
            type="text"
            name="consultantName"
            value={formData.consultantName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date of Inspection:
          <input
            type="date"
            name="inspectionDate"
            value={formData.inspectionDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Popular Name (if any):
          <input
            type="text"
            name="popularName"
            value={formData.popularName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name of River/NH No.:
          <input
            type="text"
            name="riverName"
            value={formData.riverName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ProjectInfoForm;
